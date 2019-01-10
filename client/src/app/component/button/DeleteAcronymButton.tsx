import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { DeleteAcronymIcon } from '../../icon/DeleteAcronymIcon';
import { StyledButton } from './Button';

interface Props {
  onClick: (e: any) => void;
  className?: string;
}

@observer
export class DeleteAcronymButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledButton
          onClick={this.props.onClick}
          className="deleteAcronymButton"
        >
          <DeleteAcronymIcon/>
        </StyledButton>
      </div>
    );
  }
}

export const StyledDeleteAcronymButton = styled(DeleteAcronymButton)``;