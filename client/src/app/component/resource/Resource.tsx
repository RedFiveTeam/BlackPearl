import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { PearlIcon } from '../../icon/PearlIcon';
import { ResourceModel } from './ResourceModel';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import classNames = require('classnames');
import { ResourceMenuStore } from './stores/ResourceMenuStore';

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
          <a href={this.props.resource.url} target="_blank" title={this.props.resource.name}>
            <span className="icon"><PearlIcon/></span>
            <span className="title">{this.props.resource.name}</span>
          </a>
        </div>
        <StyledResourceMenuContainer
          resource={this.props.resource}
          resourceMenuStore={new ResourceMenuStore()}
        />
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
  font-family: Amaranth;
  font-size: 18px;
  margin: auto;
  display: flex;
  vertical-align: middle;
  line-height: 27px;
  overflow: hidden;
  
  a {
   text-decoration: none;
   color: black;
   display: inline-flex;
   position: relative;
   padding: 7px;
   margin: -1px;
   width: 223px;
  }
  
  .title {
    padding-left: 7px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: -1px;
  }
  
  #borderIcon {
    position: relative;
    bottom: 1px;
  }
`);
