import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InjectedApp } from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { stores } from './app/utils/Stores';
import { Provider } from 'mobx-react';
import { actions } from './app/utils/Actions';

ReactDOM.render(
  <Provider
    {...stores}
    {...actions}
  >
    <BrowserRouter>
      <InjectedApp/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);