import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileActions } from '../profile/ProfileActions';
import { StyledProfileContainer } from '../profile/ProfileContainer';
import { StyledTimeContainer } from './widgets/time/TimeContainer';
import { StyledATODay } from './widgets/time/ATODay';
import { ATODayBorderIcon } from '../icon/ATODayBorderIcon';

interface Props {
  className?: string;
  profileActions?: ProfileActions;
}

@observer
export class AppBanner extends React.Component<Props> {
  async componentWillMount() {
    await this.props.profileActions!.setProfile();
  }

  render() {
    return (
      <div className="appBanner">
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