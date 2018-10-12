import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { PearlIcon } from '../icon/PearlIcon';

interface Props {
  resourceStore?: ResourceStore;
  name: string;
  url: string;
  className: string;
}

@observer
export class Resource extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className}>
        <a href={this.props.url} target="_blank">
          <div
            className="clickArea"
          >
            <span className="icon"><PearlIcon/></span>
            <span className="title">{this.props.name}</span>
          </div>
        </a>
      </div>
    );
  }
}

export const StyledResource = inject('resourceStore')(styled(Resource)`
  width: 335px;
  height: 38px;
  font-size: 14px;
  border: none;
  border-top: 1px solid grey;
  background: #EAEAEA;
  font-family: Acme;
  font-size: 18px;
  vertical-align: middle;
  line-height: 38px;
  margin: auto;
  
  a {
    text-decoration: none;
    color: black;
  }
  
  .clickArea {
  width: 100%;
  height: 100%;
  cursor: pointer;
  }
    
  .title {
    padding-left: 7px;
  }
`);
