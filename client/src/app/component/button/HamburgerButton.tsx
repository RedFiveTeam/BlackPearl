import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { HamburgerMenuIcon } from '../../icon/HamburgerMenu';
import classNames = require('classnames');

interface Props {
  onClick: () => void;
  className?: string;
}

@observer
export class HamburgerButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className={classNames('hamburgerButton')}
          onClick={this.props.onClick}
        >
          <HamburgerMenuIcon/>
        </div>
      </div>
    );
  }
}

export const StyledHamburgerButton = styled(HamburgerButton)`
    line-height: 55px;
    position: relative;
`;