import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';

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
        <BlackPearlShipIcon/>
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
          />
        </div>
      </div>
    );
  }
}

export const StyledAppBanner = styled(AppBanner)`
  .rightSide {
    display: inline-block;
    position: relative;
  }

  .bannerTitle {
    font-family: Iglesia;
    font-size: 68px;
    position: absolute;
    left: -12px;
    top: 5px;
  }
  
  .informationBanner {
    background: #EAEAEA;
    width: 968px;
    height: 22px;
    margin-top: 70px;
    margin-left: 10px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
`;