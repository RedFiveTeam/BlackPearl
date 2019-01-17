import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileActions } from '../profile/ProfileActions';
import { StyledProfileContainer } from '../profile/ProfileContainer';
import { StyledTimeContainer } from './widgets/time/TimeContainer';
import { StyledATODay } from './widgets/time/ATODay';
import { ATODayBorderIcon } from '../icon/ATODayBorderIcon';
import { StyledHamburgerButton } from './button/HamburgerButton';

interface Props {
  className?: string;
  profileActions?: ProfileActions;
}

@observer
export class AppBanner extends React.Component<Props> {
  async componentWillMount() {
    await this.props.profileActions!.setProfile();
  }

  toggleMenu() {
    let ele = document.querySelector('.widgetColumn') as HTMLElement;
    ele.style.minWidth = '354px';
    ele.style.maxWidth = '354px';
    ele.style.marginRight = '5px';
    let burger = document.querySelector('.bannerBurger') as HTMLElement;
    burger.style.opacity = '0';
    burger.style.cursor = 'default';
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="button">
          <StyledHamburgerButton
            className="bannerBurger"
            onClick={this.toggleMenu}
          />
        </div>
        <StyledATODay/>
        <ATODayBorderIcon/>
        <StyledTimeContainer/>
        <StyledProfileContainer/>
      </div>
    );
  }
}

export const StyledAppBanner = inject('profileActions')(styled(AppBanner)`
padding-right: 6px;
margin-left: -6px;
background: #2F343B;
display: flex;
position: sticky;
top: 0;
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
  cursor: pointer;
  left: 8px;
  transition: opacity 0.5s ease-in-out;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
  position: fixed;
}
`);