import * as React from 'react';
import { Routes } from './Routes';
import { withRouter } from 'react-router';
import { ResourceStore } from './resource/stores/ResourceStore';
import { inject, observer } from 'mobx-react';

export const WrappedRoutes = withRouter((Routes as any));

interface Props {
  resourceStore?: ResourceStore;
}

@observer
export class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <p>UNCLASSIFIED</p>
        <WrappedRoutes/>
      </div>
    );
  }
}

export const InjectedApp = inject('resourceStore')(App);