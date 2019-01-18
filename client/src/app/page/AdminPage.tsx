import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from './stores/AdminStore';
import { AdminActions } from './actions/AdminActions';
import { StyledAdminCardContainer } from '../component/card/admin/AdminCardContainer';
import { Slide, ToastContainer } from 'react-toastify';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import { LogableActions } from '../component/metrics/metric/MetricModel';

interface Props {
  adminStore?: AdminStore;
  adminActions?: AdminActions;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class AdminPage extends React.Component<Props> {
  async componentDidMount() {
    let ele = (document.querySelector('.pageTitle') as HTMLElement);
    if (ele) {
      ele.style.top = (document.querySelector('.selectors')!.getBoundingClientRect().top - 75).toString() + 'px';
      ele.style.display = 'block';
    }
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Admin');
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="pageTitle"
        >
          Admin
        </div>
        <StyledAdminCardContainer/>
        <ToastContainer
          toastClassName="customToast"
          position="top-center"
          hideProgressBar={true}
          closeOnClick={true}
          transition={Slide}
          autoClose={5000}
        />
      </div>

    );
  }
}

export const StyledAdminPage = inject('adminStore', 'adminActions', 'metricActions')(styled(AdminPage)`
.pageTitle {
  color: #FFFFFF;
  font-size: 48px;
  position: absolute;
  top: 10%;
  left: 92px;
  display: none;
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
  
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
      .Toastify__toast-body {
        padding-top: 13px;
    }
  }
`);