import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from '../component/resource/stores/ResourceStore';
import styled from 'styled-components';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledRemoveResourcePopup } from '../component/popup/RemoveResourcePopup';
import { StyledEditResourcePopup } from '../component/popup/EditResourcePopup';
import { StyledLoadingOverlay } from '../component/loading/LoadingOverlay';
import { ResourceModel } from '../component/resource/ResourceModel';
import { OperationStore } from '../component/card/operation/stores/OperationStore';
import { StyledAddOperationPopup } from '../component/popup/AddOperationPopup';
import { StyledEditOperationPopup } from '../component/popup/EditOperationPopup';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledDeleteOperationPopup } from '../component/popup/DeleteOperationPopup';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import { StyledAppBanner } from '../component/AppBanner';
import { StyledInformationContainer } from '../component/card/information/InformationContainer';
import { StyledOperationContainer } from '../component/card/operation/OperationContainer';
import { StyledWidgetContainer } from '../component/widgets/WidgetContainer';

interface Props {
  resourceStore?: ResourceStore;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Home');
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
        <StyledWidgetContainer/>
        <div
          className="mainBody"
        >
          <StyledAppBanner/>
          <StyledCardContainer/>
          <StyledInformationContainer/>
          <StyledOperationContainer/>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('resourceStore', 'operationStore', 'metricActions')(styled(HomePage)`
  display: inline-flex;
  
  .customToast {
    width: 520px;
    height: 64px;
    border-radius: 10px;
    background: black;
    color: white;
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
  
  .mainBody {
    position: relative;
    width: 100%;
    min-width: 1160px;
    display: flex;
    flex-wrap: wrap;
    background: #2F343B;
  }
  
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
      .mainBody {
      top: 50px;
      }
      
      .Toastify__toast-body {
        padding-top: 13px;
      margin-left: 20px;
    }
  }
`);
