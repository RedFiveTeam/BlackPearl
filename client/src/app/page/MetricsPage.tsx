import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsPageActions } from './actions/MetricsPageActions';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import * as moment from 'moment';
import { DisplayUserModel } from '../component/metrics/metric/MetricDisplayModel';

interface Props {
  metricsPageActions?: MetricsPageActions;
  metricsStore?: MetricsStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class MetricsPage extends React.Component<Props> {

  async componentDidMount() {
    await this.props.metricsPageActions!.initializeStores();
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Metrics');
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="pageTitle">Metrics</div>
        <div className="pageBody">
          <button onClick={this.props.metricsPageActions!.exportLogins} className="exportButton">
            EXPORT AS .CSV
          </button>
          <div className="counters">
          <div
            className="usersCounter counter"
          >
            <div className="number">
              {this.props.metricsStore!.displayData ? this.props.metricsStore!.displayData.users.length : 0}
            </div>
            <div className="title">Total User Accounts</div>
          </div>
          <div
            className="visitCounter counter"
          >
            <div className="number">
              {
                this.props.metricsStore!.displayData && this.props.metricsStore!.displayData.users.length > 0 ?
                  this.props.metricsStore!.displayData.users.map((u: DisplayUserModel) => {
                    return u.logins;
                  }).reduce((count, curr) => {
                    return count + curr;
                  }) : 0
              }
            </div>
            <div className="title">Total Visits</div>
          </div>
          </div>
          <div
            className="recentActions"
          >
            <table>
              <tbody>
              <tr>
                <td>Users</td>
                <td>Action</td>
                <td>Context</td>
                <td>Time</td>
              </tr>
              {
                this.props.metricsStore!.logins.reverse().slice(0, 50).map((l, index) => {
                  return (
                    <tr
                      key={index}
                    >
                      <td>{l.cardID.split('.')[1] + ' ' + l.cardID.split('.')[0]}</td>
                      <td>{l.action}</td>
                      <td>{l.context}</td>
                      <td>{moment.unix(l.time).format('MMMM D, YYYY HHmm')}L</td>
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledMetricsPage = inject('metricsPageActions', 'metricsStore', 'metricActions')(styled(MetricsPage)`
  .pageTitle {
    color: #FFFFFF;
    font-size: 48px;
    margin: 20px 0 20px 74px;
  }
  
  .pageBody{
    margin: auto auto 20px auto;
    background: #1F2226;
    color: #93A6C2;
    position: relative;
    width: 90%;
    min-width: 1503px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
  
  .number {
    font-size: 64px;
    color: #fff;
  }
  
  .counter {
    display: inline-block;
    text-align: center;
  }
  
  .counters {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 55px;
    padding-top: 109px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .exportButton {
    position: absolute;
    right: 33px;
    top: 15px;
    background: none;
    border: none;
    color: #76ADED;
    cursor: pointer;
  }
  
  table {
    border-top: 1px solid rgba(255, 255, 255, 0.28);
    width: 90%;
    margin: auto;
  }
  
  td {
    padding: 0px;
    font-size: 18px;
  }
  
  td:nth-of-type(1) {
    width: 40%;
  }
  
  td:nth-of-type(2) {
    width: 25%;
  }
  
  td:nth-of-type(3) {
    width: 21%;
  }
  
  tr:first-of-type > td {
    padding-top: 73px;
    color: #FFFFFF;
    font-size: 36px;
  }
`);