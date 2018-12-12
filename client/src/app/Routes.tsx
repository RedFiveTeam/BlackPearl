import * as React from 'react';
import { Route, Switch } from 'react-router';
import { StyledHomePage } from './page/HomePage';
import { observer } from 'mobx-react';
import { StyledAdminPage } from './page/AdminPage';
import { StyledGiffordPage } from './page/GiffordPage';
import { StyledMetricsPage } from './page/MetricsPage';
import { StyledNotFoundPage } from './page/errors/NotFoundPage';

@observer
export class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={() => <StyledHomePage/>}/>
        <Route path="/admin" render={() => <StyledAdminPage/>}/>
        <Route path="/poopdeck" render={() => <StyledAdminPage/>}/>
        <Route path="/gifford" render={() => <StyledGiffordPage/>}/>
        <Route path="/metrics" render={() => <StyledMetricsPage/>}/>
        <Route path="/*" render={() => <StyledNotFoundPage/>}/>
      </Switch>
    );
  }
}