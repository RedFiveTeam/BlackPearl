import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';
import { StyledTimeContainer } from './widgets/time/TimeContainer';

interface Props {
  className?: string;
}

@observer
export class AppBanner extends React.Component<Props> {
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
          <div className="informationBanner"/>
          <StyledTimeContainer/>
        </div>
      </div>
    );
  }
}

export const StyledAppBanner = styled(AppBanner)`
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
    display: none;
    width: 954px;
    height: 22px;
    margin-top: 80px;
    margin-left: 10px;
    margin-bottom: 3px;
    display: flex;
    justify-content: flex-end;
  }
`;