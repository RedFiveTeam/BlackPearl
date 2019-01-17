import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledButton } from './Button';
import { EditIcon } from '../../icon/EditIcon';

interface Props {
  onClick: () => void;
  className?: string;
}

@observer
export class EditButton extends React.Component<Props> {

  render() {
    return (
      <div className={this.props.className}>
        <StyledButton
          onClick={this.props.onClick}
          className={'editButton'}
        >
          <EditIcon/>
        </StyledButton>
      </div>
    );
  }
}

export const StyledEditButton = (styled(EditButton)`
  .editButton {
    height: 62px;
    border: none;
    background: none;
    cursor: pointer;
    }
`);