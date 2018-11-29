import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledThreeDotButton } from '../../button/ThreeDotButton';
import { StyledEditButton } from '../../button/EditButton';
import { OperationMenuStore } from './stores/OperationMenuStore';
import { OperationActions } from './actions/OperationActions';
import { OperationModel } from './OperationModel';
import { BorderIcon } from '../../../icon/BorderIcon';
import { StyledDeleteButton } from '../../button/DeleteButton';

interface Props {
  className?: string;
  operation: OperationModel;
  operationMenuStore: OperationMenuStore;
  operationActions?: OperationActions;
}

@observer
export class OperationMenuContainer extends React.Component<Props> {
  node: any = this.node;

  componentDidMount() {
    this.props.operationMenuStore.hydrate();
    document.addEventListener('click', this.handleClick, false);
  }

  handleClick = (e: any) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    this.props.operationMenuStore.menuVisibilityOff();
  };

  deleteClick = async () => {
    await this.props.operationActions!.createPendingDelete(this.props.operation);
    this.props.operationMenuStore.menuVisibilityOff();
  };

  editClick = async () => {
    await this.props.operationActions!.createPendingEdit(this.props.operation);
    this.props.operationMenuStore.menuVisibilityOff();
  };

  threeDotClick = () => {
    this.props.operationMenuStore.toggleMenuVisibility();
  };

  render() {
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className}
      >
        {
          this.props.operationMenuStore.menuVisible &&
          <div>
              <StyledEditButton
                  onClick={this.editClick}
              />
              <BorderIcon/>
              <StyledDeleteButton
                  onClick={this.deleteClick}
              />
          </div>
        }
        <StyledThreeDotButton
          className={this.props.operation.title}
          onClick={this.threeDotClick}
        />
      </div>
    );
  }
}

export const StyledOperationMenuContainer = inject('operationActions')(styled(OperationMenuContainer)`
  width: 120px;
  float: right;
  display: flex;
  justify-content: flex-end;
  align-self: baseline;
  
  div {
    display: flex;
    align-items: center;
  }
  
  svg {
    filter: drop-shadow(-1px 1px 1px rgba(0,0,0,0.25));
  }
  
  .deleteButton {
    padding-top: 5px;
    margin-left: 5px;
    margin-right: 10px;
  }
  
  .editButton {
    margin-right: 5px;
    padding-top: 5px;
  }
`);