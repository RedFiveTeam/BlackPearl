import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledButton } from './Button';
import { DeleteIcon } from '../../icon/DeleteIcon';

interface Props {
  onClick: () => void;
  className?: string;
}

@observer
export class DeleteButton extends React.Component<Props> {

  render() {
    return (
      <div className={this.props.className}>
        <StyledButton
          onClick={this.props.onClick}
          className={'deleteButton'}
        >
          <DeleteIcon/>
        </StyledButton>
      </div>

    );
  }
}

export const StyledDeleteButton = (styled(DeleteButton)`
  .deleteButton {
    height: 37px;
    border: none;
    background: none;
    cursor: pointer;
  }
`);