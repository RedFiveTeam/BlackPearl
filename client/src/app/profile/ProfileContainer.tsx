import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { PersonIcon } from '../icon/PersonIcon';
import classNames = require('classnames');
import titleCase = require('title-case');

interface Props {
  displayName: string;
  className?: string;
}

@observer
export class ProfileContainer extends React.Component<Props> {

  render() {
    return (
      <div className={classNames(this.props.className, 'profile-info')}>
        <div className={classNames(this.props.className, 'username')}>
          {titleCase(this.props.displayName)}
        </div>
        <PersonIcon/>
      </div>
    );
  }
}

export const StyledProfileContainer = styled(ProfileContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  font-size: 14px;
  color: #FFFFFF;
  font-family: "Avenir Next";
  
  #personIcon {
    margin: 0px 3px 0px 21px;
  }
`;