import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { PearlIcon } from '../icon/PearlIcon';
import { StyledDeleteButton } from '../component/button/DeleteButton';
import classNames = require('classnames');
import { ResourceModel } from './ResourceModel';

interface Props {
  resource: ResourceModel;
  resourceStore?: ResourceStore;
  className?: string;
}

@observer
export class Resource extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(this.props.className, 'resource')}>
        <div>
          <a href={this.props.resource.url} target="_blank">
            <span className="icon"><PearlIcon/></span>
            <span className="title">{this.props.resource.name}</span>
          </a>
        </div>
        {
          this.props.resource.id &&
          <StyledDeleteButton resource={this.props.resource}/>
        }
      </div>
    );
  }
}

export const StyledResource = inject('resourceStore')(styled(Resource)`
  width: 335px;
  height: 37px;
  font-size: 14px;
  border: none;
  border-top: 1px solid grey;
  background: #EAEAEA;
  font-family: Acme;
  font-size: 18px;
  margin: auto;
  display: flex;
  
  a {
   text-decoration: none;
   color: black;
   display: inline-block;
   position: relative;
   //z-index: 1; //makes the a element clickable over other elements if needed
   padding: 7px;
   margin: -1px;
   width: 290px;
  }
    
  .title {
    padding-left: 7px;
  }
`);
