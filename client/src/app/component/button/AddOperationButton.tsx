import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledButton } from './Button';
import { OperationActions } from '../card/operation/actions/OperationActions';
import { AddResourceIcon } from '../../icon/AddResourceIcon';

interface Props {
  className?: string;
  operationActions?: OperationActions;
}

@observer
export class AddOperationButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledButton
          className="addOperationButton"
          onClick={() => {
            this.props.operationActions!.createPendingOperation();
          }}
        >
          <div className="icon">
            <AddResourceIcon/>
          </div>
        </StyledButton>
      </div>
    );
  }
}

export const StyledAddOperationButton = inject('operationActions')(styled(AddOperationButton)`
`);