import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsPageActions } from './actions/MetricsPageActions';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import * as moment from 'moment';

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
    this.props.metricActions!.logMetric(LogableActions.VISIT, 'Metrics');
  }

  render() {
    return (
      <div className="metrics">
        <h1 className="users">Total user accounts: {this.props.metricsStore!.userCount}</h1>
        <h1 className="visits">
          Total Visits: {
          this.props.metricsStore!.logins.filter((l) => {
            return (typeof l.action === 'string' && l.action === 'VISIT') || (l.action === LogableActions.VISIT);
          }).length
        }
        </h1>
        <button onClick={this.props.metricsPageActions!.exportLogins} className="exportLoginsButton">
          Export Metrics
        </button>
        <div
          className="recentActions"
        >
          <table>
            <tbody>
            <tr><td>Time</td><td>Card ID</td><td>Action</td><td>Context</td></tr>
            {
              this.props.metricsStore!.logins.reverse().slice(0, 50).map((l, index) => {
                return (
                  <tr
                    key={index}
                  >
                    <td>{moment(l.time).format('MMMM Do YYYY H:mm')}Z</td>
                    <td>{l.cardID}</td>
                    <td>{l.action}</td>
                    <td>{l.context}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export const StyledMetricsPage = inject('metricsPageActions', 'metricsStore', 'metricActions')(styled(MetricsPage)`

`);