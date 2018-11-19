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
      </div>
    );
  }
}

export const StyledMetricsPage = inject('metricsActions', 'metricsStore')(styled(MetricsPage)`
`);