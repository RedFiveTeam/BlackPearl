import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledEditButton } from '../../button/EditButton';
import { OperationActions } from './actions/OperationActions';
import { OperationModel } from './OperationModel';
import { StyledDeleteButton } from '../../button/DeleteButton';

interface Props {
  className?: string;
  operation: OperationModel;
  operationActions?: OperationActions;
}

@observer
export class OperationMenuContainer extends React.Component<Props> {
  node: any = this.node;

  deleteClick = async () => {
    await this.props.operationActions!.createPendingDelete(this.props.operation);
  };

  editClick = async () => {
    await this.props.operationActions!.createPendingEdit(this.props.operation);
  };

  render() {
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className + ' operationMenu'}
      >
        {
          <div>
            <StyledEditButton
              onClick={this.editClick}
            />
            <StyledDeleteButton
              onClick={this.deleteClick}
            />
          </div>
        }
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
  z-index: 1;
  display: flex;
  opacity: 0;
  transition: opacity 0.2s ease;
  
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