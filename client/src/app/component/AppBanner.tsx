import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';
import { ProfileActions } from '../profile/ProfileActions';
import { ProfileStore } from '../profile/ProfileStore';

const Person = require('../icon/Person.png');

interface Props {
  className?: string;
  profileActions?: ProfileActions;
  profileStore?: ProfileStore;
}

@observer
export class AppBanner extends React.Component<Props> {

  async componentDidMount() {
    await this.props.profileActions!.setProfile();
    await this.props.profileActions!.addLogin();
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="leftSide">
          <BlackPearlShipIcon/>
        </div>
        <div className="rightSide">
          <div className="bannerTitle">
            The Black Pearl
          </div>
          <div className="informationBanner">
            {
              this.props.profileStore!.profile &&
              this.props.profileStore!.profile.name
            }
            <img src={Person}/>
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
    position: absolute;
    left: 10px;
    bottom: 53px;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  }
  
  .informationBanner {
    background: #EAEAEA;
    display: inline-block;
    width: 967px;
    height: 37px;
    margin-top: 76px;
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
    border-radius: 18px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
    font-size: 12px;
    font-family: Amaranth;
    text-decoration: underline;
    align-items: center;
  }
  
  img {
  width: 31px;
  height: 31px;
  margin-right: 4px;
  margin-left: 10px;
  }
`);