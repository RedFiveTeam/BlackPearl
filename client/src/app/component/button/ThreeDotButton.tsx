import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ThreeDotIcon } from '../../icon/ThreeDotIcon';
import { StyledButton } from './Button';
import { ResourceModel } from '../../resource/ResourceModel';
import classNames = require('classnames');

interface Props {
  className?: string;
  onClick: () => void;
  resource: ResourceModel;
}

@observer
export class ThreeDotButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledButton
          className={classNames('threeDotButton', this.props.resource.name)}
          onClick={this.props.onClick}
        >
          <ThreeDotIcon/>
        </StyledButton>
      </div>
    );
  }
}

export const StyledThreeDotButton = styled(ThreeDotButton)`
  .threeDotButton {
    height: 37px;
    border: none;
    background: none;
    cursor: pointer;
    }
`;