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
  componentDidMount() {
    this.props.metricActions!.logMetric(LogableActions.VISIT, 'Admin');
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
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

`);