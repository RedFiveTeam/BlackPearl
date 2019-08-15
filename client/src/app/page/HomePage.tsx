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
import { ProfileStore } from '../profile/ProfileStore';
import { ProfileActions } from '../profile/ProfileActions';
import { StyledClassificationBanner } from '../component/classification/ClassificationBanner';
import { StyledLoginPopup } from '../component/popup/LoginPopup';
import { StyledFindLoginPopup } from '../component/popup/FindLoginPopup';
import { ClassificationStore } from '../component/classification/ClassificationStore';
import { ClassificationActions } from '../component/classification/ClassificationActions';
import { StyledConfirmLogoutPopup } from '../component/popup/ConfirmLogoutPopup';
import { StyledLinkProfilePopup } from '../component/popup/LinkProfilePopup';
import { LoginActions } from '../component/login/LoginActions';
import { StyledSetupGoPopup } from '../component/popup/SetupGoPopup';

interface Props {
  resourceStore?: ResourceStore;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
  profileStore?: ProfileStore;
  profileActions?: ProfileActions;
  loginActions?: LoginActions;
  classificationActions?: ClassificationActions;
  classificationStore?: ClassificationStore;
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  async componentWillMount() {
    if (navigator.userAgent.toLowerCase().indexOf('electron') !== -1) {
      this.props.profileStore!.setHasProfile(true);
      await this.props.loginActions!.createNewProfile('Acceptance.Testing.Test');
    }
  }

  async componentDidMount() {
    await this.props.profileActions!.setProfile();
    this.props.profileActions!.checkForPreviousProfile();
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Home');
    await this.props.classificationActions!.initializeStore();
    this.getQ();
  }

  getQ() {
    let getParams = window.location.search;
    let query = getParams.substr(getParams.indexOf('q=') + 2, 64);
    let search = getParams.substr(getParams.indexOf('search=') + 7, 1);

    if (search === '1') {
      this.props.resourceStore!.setFilter(query);
    } else if (search === '0') {
      this.props.resourceStore!.setPendingResource(
        new ResourceModel(null, '', decodeURIComponent(query), 0)
      );
    }
  }

  displayBody() {
    return (
      <div>
        <StyledAppBanner/>
        <StyledCardContainer/>
        <StyledInformationContainer/>
        <StyledOperationContainer/>
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          (this.props.profileStore!.loginMatches.length > 0) &&
          <StyledLinkProfilePopup/>
        }
        {
          this.props.profileStore!.displayLogoutModal &&
          <StyledConfirmLogoutPopup/>
        }
        {
          this.props.profileStore!.hasOldProfile &&
          <StyledFindLoginPopup/>
        }
        {
          !this.props.profileStore!.hasProfile &&
          <StyledLoginPopup/>
        }
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
        {
          this.props.resourceStore!.goPopupVisible &&
            <StyledSetupGoPopup/>
        }
        <ToastContainer
          toastClassName="customToast"
          position="top-center"
          hideProgressBar={true}
          closeOnClick={true}
          transition={Slide}
          autoClose={5000}
        />
        <div className="topDiv">
          <div className="banner">
            <StyledClassificationBanner
              classification={this.props.classificationStore!.classification}
            />
          </div>

          <div className="page">
            <StyledWidgetContainer
              visible={this.props.profileStore!.profile ? this.props.profileStore!.profile.widgetsVisible : 1}
            />
            <div
              className="mainBody"
            >
              {
                this.props.profileStore!.hasProfile && this.props.profileStore!.loginMatches.length === 0 &&
                this.displayBody()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject(
  'resourceStore',
  'operationStore',
  'metricActions',
  'profileStore',
  'profileActions',
  'classificationStore',
  'classificationActions',
  'loginActions'
)
(styled(HomePage)`
  display: inline-flex;
  width: 100%;
  
  
  .page {
    display: flex;
    margin-top: 26px;
  }
  
  .topDiv {
    display: block;
  }
  
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
