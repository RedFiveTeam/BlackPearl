import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';
import { StyledATODay } from './widgets/ATODay';
import { StyledTZClock } from './widgets/TZClock';

interface Props {
  className?: string;
}

@observer
export class AppBanner extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="leftSide"
        >
        <BlackPearlShipIcon/>
        </div>
        <div
          className="rightSide"
        >
          <div
            className="bannerTitle"
          >
            The Black Pearl
          </div>
          <div
            className="informationBanner"
          >
            <StyledATODay/>
          </div>
          <div
            className="timeBanner"
          >
            <StyledTZClock
              title="LANGLEY"
              timeZone="America/New_York"
            />
            <StyledTZClock
              title="ZULU"
              timeZone="Etc/UTC"
            />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledAppBanner = styled(AppBanner)`
display: flex;

  .leftSide {
    min-width: 104px;
  }

  .rightSide {
    display: flex;
    position: relative;
  }

  .bannerTitle {
    font-family: Iglesia;
    font-size: 68px;
    position: absolute;
    left: -12px;
    top: 20px;
  }
  
  .informationBanner {
    background: #EAEAEA;
    width: 968px;
    height: 22px;
    margin-top: 80px;
    margin-left: 10px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
    font-family: Acme;
    font-size: 18px;
  }
  
  .timeBanner {
      background: #EAEAEA;
      width: 340px;
      height: 45px;
      box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
      display: flex;
      justify-content: space-between;
      font-family: Acme;
      font-size: 18px;
      padding-left: 10px;
      align-self: flex-end;
      margin-left: 10px;
      position: relative;
      bottom: 6px;
  }
`;