import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledDeleteButton } from '../button/DeleteButton';
import { StyledEditButton } from '../button/EditButton';
import { ResourceModel } from './ResourceModel';
import { ResourceActions } from './actions/ResourceActions';
import { ProfileStore } from '../../profile/ProfileStore';
import { MetricActions } from '../metrics/metric/MetricActions';
import { ResourceStore } from './stores/ResourceStore';

interface Props {
  resource: ResourceModel;
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  profileStore?: ProfileStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class ResourceMenuContainer extends React.Component<Props> {
  node: any = this.node;

  edit = async () => {
    await this.props.resourceActions!.createPendingEdit(this.props.resource);
  };

  delete = async () => {
    await this.props.resourceActions!.createPendingDelete(this.props.resource);
  };

  render() {
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className + ' resourceMenu'}
      >
        <StyledEditButton onClick={this.edit}/>
        <StyledDeleteButton onClick={this.delete}/>
      </div>
    );
  }
}

export const StyledResourceMenuContainer = inject(
  'resourceActions', 'profileStore', 'metricActions', 'resourceStore'
)
(styled(ResourceMenuContainer)`
  position: absolute;
  height: 100%;
  width: 18%;
  align-items: center;
  justify-content: flex-end;
  right: 10px;
  z-index: 1;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  svg {
    padding-left: 7px;
    filter: drop-shadow(-1px 1px 1px rgba(0,0,0,0.25));
  }
  
  .deleteButton {
      padding-top: 15%;
      padding-right: 0px;
  }
  
  .editButton {
      padding-top: 15%;
  }
`);