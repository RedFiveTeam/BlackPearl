import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsActions } from './actions/MetricsActions.tsx';

interface Props {
  metricsActions?: MetricsActions;
  metricsStore?: MetricsStore;
  className?: string;
}

@observer
export class MetricsPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.metricsActions!.initializeStores();
  }

  render() {
    return (
      <div className="metrics">
        <h1 className="users">Total user accounts: {this.props.metricsStore!.userCount}</h1>
        <table className="login-table">
          <tr className="login-header">
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
          {
            this.props.metricsStore!.logins.map((login, index) => {
              return (
                <tr key={index}>
                  <td>{login.user.id}</td>
                  <td>{login.user.name}</td>
                  <td>{login.time.toISOString()}</td>
                </tr>
              );
            })
          }
        </table>
      </div>
    );
  }
}

export const StyledMetricsPage = inject('metricsActions', 'metricsStore')(styled(MetricsPage)`
`);