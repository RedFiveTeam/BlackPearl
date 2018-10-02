import * as React from 'react';
import { StyledResourceList } from '../resource/ResourceList';
import { observer } from 'mobx-react';

@observer
export class HomePage extends React.Component {

  render() {
    return (
      <div>
        <p>Home Page</p>
        <StyledResourceList/>
      </div>
    );
  }
}
