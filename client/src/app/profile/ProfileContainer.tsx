import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileStore } from './ProfileStore';
import { PersonIcon } from '../icon/PersonIcon';
import classNames = require('classnames');

interface Props {
  displayName: string;
  className?: string;
  profileStore?: ProfileStore;
}

@observer
export class ProfileContainer extends React.Component<Props> {

  render() {

    return (
      <div
        className={classNames(this.props.className, 'profile-info')}
      >
        <div className={classNames(this.props.className, 'username')}>
          {this.props.displayName}
        </div>
        <PersonIcon/>
      </div>
    );
  }
}

export const StyledProfileContainer = inject('profileStore')
(styled(ProfileContainer)`
  align-items: center;
  display: flex;
  font-size: 14px;
  color: #FFFFFF;
  font-family: "Avenir Next";
  line-height: 100%;
  
  position: fixed;
  right: 0;
  top: 15px;
  
  #personIcon {
    margin: 0px 21px 0px 19px;
  }
  
  .username {
    text-transform: lowercase;
  }
`);