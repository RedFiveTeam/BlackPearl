import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { PersonIcon } from '../icon/PersonIcon';
import classNames = require('classnames');
import { ProfileStore } from './ProfileStore';

interface Props {
  displayName: string;
  className?: string;
  profileStore?: ProfileStore;
}

@observer
export class ProfileContainer extends React.Component<Props> {

  render() {
    return (
      <div className={classNames(this.props.className, 'profile-info')}>
        <div className={classNames(this.props.className, 'username')}>
          {this.props.displayName === 'Guest' ? 'Guest' : this.props.displayName.toLowerCase()}
        </div>
        <PersonIcon/>
        <span
          className={'logout'}
          onClick={() => {
            this.props.profileStore!.setDisplayLogoutModal(true);
          }}
        >
          Log Out
        </span>
      </div>
    );
  }
}

export const StyledProfileContainer = inject('profileStore')(styled(ProfileContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  font-size: 14px;
  color: #FFFFFF;
  
  #personIcon {
    margin: 0 8px 0 8px;
  }
  
  .logout {
    cursor: pointer;
    color: #76ADED;
  }
`);
