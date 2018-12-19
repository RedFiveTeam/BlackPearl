import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from '../component/resource/stores/ResourceStore';
import styled from 'styled-components';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledRemoveResourcePopup } from '../component/popup/RemoveResourcePopup';
import { StyledEditResourcePopup } from '../component/popup/EditResourcePopup';
import { StyledAcronymContainer } from '../component/widgets/acronym/AcronymContainer';
import { StyledWeatherContainer } from '../component/widgets/weather/WeatherContainer';
import { StyledCoordinateConverterContainer } from
    '../component/widgets/coordinateConverter/CoordinateConverterContainer';
import { StyledLoadingOverlay } from '../component/loading/LoadingOverlay';
import { ResourceModel } from '../component/resource/ResourceModel';
import { OperationStore } from '../component/card/operation/stores/OperationStore';
import { StyledAddOperationPopup } from '../component/popup/AddOperationPopup';
import { StyledEditOperationPopup } from '../component/popup/EditOperationPopup';
import { StyledTimeContainer } from '../component/widgets/time/TimeContainer';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledDeleteOperationPopup } from '../component/popup/DeleteOperationPopup';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import { StyledProfileContainer } from '../profile/ProfileContainer';

interface Props {
  resourceStore?: ResourceStore;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  componentDidMount() {
    this.props.metricActions!.logMetric(LogableActions.VISIT, 'Home');
    this.getQ();
  }

  getQ() {
    let getParams = window.location.search;
    let query = getParams.substr(getParams.indexOf('q=') + 2, 64);
    let search = getParams.substr(getParams.indexOf('search=') + 7, 1);
    let specialty: number;
    specialty = parseInt(getParams.substr(getParams.indexOf('specialty=') + 10, 1), 10);

    if (search === '1') {
      this.props.resourceStore!.setFilter(query);
    } else if (search === '0') {
      this.props.resourceStore!.setPendingResource(
        new ResourceModel(null, '', decodeURIComponent(query), (specialty * 3) - 2)
      );
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.operationStore!.hasPendingDelete &&
          <StyledDeleteOperationPopup/>
        }
        {
          this.props.operationStore!.hasPendingOperation &&
          <StyledAddOperationPopup/>
        }
        {
          this.props.operationStore!.hasPendingEdit &&
          <StyledEditOperationPopup/>
        }
        {
          this.props.resourceStore!.loading &&
          <StyledLoadingOverlay/>
        }
        {
          this.props.resourceStore!.hasPendingResource &&
          <StyledAddResourcePopup/>
        }
        {
          this.props.resourceStore!.hasPendingEdit &&
          <StyledEditResourcePopup/>
        }
        {
          this.props.resourceStore!.hasPendingDelete &&
          <StyledRemoveResourcePopup/>
        }
        <ToastContainer
          toastClassName="customToast"
          position="top-center"
          hideProgressBar={true}
          closeOnClick={true}
          transition={Slide}
          autoClose={5000}
        />
        <div
          className="cardsContainer"
        >
          <StyledCardContainer/>
          <div className="widgetSection">
            <StyledProfileContainer/>
            <StyledTimeContainer/>
            <StyledAcronymContainer/>
            <StyledCoordinateConverterContainer/>
            <StyledWeatherContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('resourceStore', 'operationStore', 'metricActions')(styled(HomePage)`
  margin-left: -8px;
  position: absolute;
  
  .customToast {
    width: 520px;
    height: 64px;
    border-radius: 10px;
    background: black;
    color: white;
    font-family: Amaranth;
    font-size: 24px;
    
    button {
      position: relative;
      top: 6px;
      font-size: 30px;
      margin-right: 15px;
    }
    
    .Toastify__toast-body {
      margin-left: 20px;
    }
  }

  .cardsContainer {
    display: flex;
    position: relative;
  }
  
  .widgetSection {
    position: fixed;
    display: block;
    top: 10px;
    left: 1450px;
  }
`);
