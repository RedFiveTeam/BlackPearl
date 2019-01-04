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
    let ele = document.querySelector('.widgetSection') as HTMLElement;
    ele.style.width = '354px';
    let burger = document.querySelector('.bannerBurger') as HTMLElement;
    burger.style.opacity = '0';
    burger.style.cursor = 'default';
  }

  render() {
    return (
      <div className="appBanner">
        <div className="button">
          <StyledHamburgerButton
            className="bannerBurger"
            onClick={this.toggleMenu}
          />
        </div>
        <StyledATODay className="atoDay"/>
        <ATODayBorderIcon/>
        <StyledTimeContainer/>
        <StyledProfileContainer/>
      </div>
    );
  }
}

export const StyledAppBanner = inject('profileActions')(styled(AppBanner)`
`);