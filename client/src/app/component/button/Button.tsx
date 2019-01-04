import * as React from 'react';
import styled from 'styled-components';

interface Props {
  text?: string;
  onClick: (e: any) => void;
  className?: string;
}

export class Button extends React.Component<Props> {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.children}{this.props.text}
      </button>
    );
  }
}

export const StyledButton = styled(Button)`
  outline: 0px;
`;