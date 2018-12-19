import * as React from 'react';
import { Routes } from './Routes';
import { withRouter } from 'react-router';
import { observer } from 'mobx-react';

export const WrappedRoutes = withRouter((Routes as any));

interface Props {
}

@observer
export class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <WrappedRoutes/>
      </div>
    );
  }
}

export const InjectedApp = (App);