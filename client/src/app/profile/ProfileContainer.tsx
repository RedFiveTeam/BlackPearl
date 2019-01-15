import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileStore } from './ProfileStore';
import { PersonIcon } from '../icon/PersonIcon';

interface Props {
  className?: string;
  profileStore?: ProfileStore;
}

@observer
export class ProfileContainer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="profileSection">
          {
            this.props.profileStore!.profile &&
            this.props.profileStore!.profile.name
          }
          <PersonIcon/>
        </div>
      </div>
    );
  }
}

export const StyledProfileContainer = inject('profileStore')
(styled(ProfileContainer)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #FFFFFF;
  width: 360px;
  font-family: "Avenir Next";
  
  .profileSection {
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  }
  
  #personIcon {
    margin: 0px 21px 0px 19px;
  }
  
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
  .profileSection {
  top: 15px;
  }
}
`);