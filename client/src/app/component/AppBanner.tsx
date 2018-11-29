import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileActions } from '../profile/ProfileActions';
import { ProfileStore } from '../profile/ProfileStore';

const ShipLogo = require('../icon/ShipLogo.png');

interface Props {
  className?: string;
  profileActions?: ProfileActions;
  profileStore?: ProfileStore;
}

@observer
export class AppBanner extends React.Component<Props> {

  async componentWillMount() {
    await this.props.profileActions!.setProfile();
    await this.props.profileActions!.addLogin();
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="leftSide">
          <img className="shipImage" src={ShipLogo}/>
        </div>
        <div className="rightSide">
          <div className="bannerTitle">
            The Black Pearl
          </div>
        </div>
      </div>
    );
  }
}

export const StyledAppBanner = inject('profileActions', 'profileStore')(styled(AppBanner)`
display: flex;
min-width: 1471px;

  .leftSide {
    min-width: 104px;
    margin-left: 7px;
  }

  .rightSide {
    display: flex;
    position: relative;
  }

  .bannerTitle {
    font-family: Iglesia;
    font-size: 68px;
    left: 10px;
    margin: auto;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  }
  
  .shipImage {
    width: 78px;
    height: 66px;
  }
`);