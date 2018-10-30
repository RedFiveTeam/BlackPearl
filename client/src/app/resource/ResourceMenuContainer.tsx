import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledThreeDotButton } from '../component/button/ThreeDotButton';
import { StyledDeleteButton } from '../component/button/DeleteButton';
import { StyledEditButton } from '../component/button/EditButton';
import { BorderIcon } from '../icon/BorderIcon';
import { ResourceModel } from './ResourceModel';
import { ResourceActions } from './actions/ResourceActions';
import { ResourceMenuStore } from './stores/ResourceMenuStore';

interface Props {
  resource: ResourceModel;
  resourceMenuStore: ResourceMenuStore;
  resourceActions?: ResourceActions;
  className?: string;
}

@observer
export class ResourceMenuContainer extends React.Component<Props> {
  node: any = this.node;

  componentDidMount() {
    this.props.resourceMenuStore.hydrate();
    document.addEventListener('click', this.handleClick, false);
  }

  handleClick = (e: any) => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.props.resourceMenuStore.menuVisibilityOff();
  };

  edit = async () => {
    await this.props.resourceActions!.createPendingEdit(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
  };

  delete = async () => {
    await this.props.resourceActions!.createPendingDelete(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
  };

  render() {
    const {resourceMenuStore} = this.props;
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className}
      >
        {
          resourceMenuStore.menuVisible &&
          <StyledEditButton onClick={this.edit}/>
        }
        {
          resourceMenuStore.menuVisible &&
          <BorderIcon/>
        }
        {
          resourceMenuStore.menuVisible &&
          <StyledDeleteButton onClick={this.delete}/>
        }
        <StyledThreeDotButton
          onClick={resourceMenuStore.toggleMenuVisibility}
          className={this.props.resource.name}
        />
      </div>
    );
  }
}

export const StyledResourceMenuContainer = inject('resourceActions')(styled(ResourceMenuContainer)`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
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