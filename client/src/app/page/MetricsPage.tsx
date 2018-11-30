import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsActions } from './actions/MetricsActions';

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
        <h1 className="logins">Total logins: {this.props.metricsStore!.logins.length}</h1>
        <button onClick={this.props.metricsActions!.exportLogins} className="exportLoginsButton">Export Logins</button>
      </div>
    );
  }
}

export const StyledMetricsPage = inject('metricsActions', 'metricsStore')(styled(MetricsPage)`
`);