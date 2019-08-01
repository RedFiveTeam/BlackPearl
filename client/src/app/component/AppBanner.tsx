import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileActions } from '../profile/ProfileActions';
import { StyledProfileContainer } from '../profile/ProfileContainer';
import { StyledTimeContainer } from './widgets/time/TimeContainer';
import { StyledATODay } from './widgets/time/ATODay';
import { ATODayBorderIcon } from '../icon/ATODayBorderIcon';
import { StyledHamburgerButton } from './button/HamburgerButton';
import { ProfileStore } from '../profile/ProfileStore';

interface Props {
  className?: string;
  profileActions?: ProfileActions;
  profileStore?: ProfileStore;
}

@observer
export class AppBanner extends React.Component<Props> {
  renderWidgets() {
    if (!this.props.profileStore!.profile.widgetsVisible) {
      let ele = document.querySelector('.widgetColumn') as HTMLElement;
      ele.classList.add('expandedWidgetColumn');
      return (
        <div className="button">
          <StyledHamburgerButton
            className="bannerBurger"
            onClick={async () => {
              await this.props.profileActions!.toggleWidgetsVisible();
            }}
          />
        </div>
      );
    }
    return;
  }

  render() {
    let {profileActions, profileStore} = this.props;
    let {profile} = this.props.profileStore!;

    return (
      <div className={this.props.className}>
        {
          profileStore!.profile &&
          this.renderWidgets()
        }
        <StyledATODay/>
        <ATODayBorderIcon/>
        <StyledTimeContainer/>
        {
          profile &&
          <StyledProfileContainer
              displayName={profileActions!.generateDisplayName(profile)}
          />
        }
      </div>
    );
  }
}

export const StyledAppBanner = inject('profileActions', 'profileStore')(styled(AppBanner)`
padding-right: 6px;
margin-left: -6px;
background: #2F343B;
display: flex;
position: sticky;
top: 26px;
z-index: 5;
height: 53px;
width: 100%;
float: right;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
color: #F2F2F2;
  
#ATODayBorderIcon {
  height: 53px;
  margin-right: 15px;
}

.bannerBurger {
  margin-left: 15px;
  left: 8px;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
  position: fixed;
}
`);
