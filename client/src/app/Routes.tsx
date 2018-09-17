import * as React from 'react';
import { Route, Switch } from 'react-router';
import { PersonPage } from './page/PersonPage';
import { HomePage } from './page/HomePage';
import { observer } from 'mobx-react';

@observer
export class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={() => <HomePage/>}/>
        <Route exact={true} path="/person" render={() => <PersonPage/>}/>
      </Switch>
    );
  }
}