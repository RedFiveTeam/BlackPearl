import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { LeftArrowIcon } from '../../icon/LeftArrowIcon';
const ShipLogo = require('../../icon/ShipLogo.png');

interface Props {
  className?: string;
}

@observer
export class NotFoundPage extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="errorShip">
          <img className="shipImage" src={ShipLogo}/>
          <div className="firstFour">4</div>
          <div className="zero">0</div>
          <div className="secondFour">4</div>
        </div>
        <div className="text">
          <div className="title">Lost at Sea?</div>
          <div className="subtitle">Be sure to check the page address!</div>
          <div className="message">
            Make sure http:// or https:// is the correct header.<br/>
            If that doesn't work,<br/>
            The address may have recently changed or the site could be temporarily down.
          </div>
          <div className="goBackButton"><a href="/"><LeftArrowIcon/><div>Go Back</div></a></div>
        </div>
      </div>
    );
  }
}

export const StyledNotFoundPage = styled(NotFoundPage)`
 top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 1;
  background: #7E7C7C;
  color: #ECECEC;
  display: inline-flex;
  justify-content: center;
  
  .title {
    margin-top: 55px;
    font-size: 72px;
  }
  
  .subtitle {
    font-size: 36px;
    margin-top: 15px;
  }
  
  .message {
    font-size: 24px;
    line-height: 40px;
  }
  
  .goBackButton {
    font-size: 24px;
    color: #ECECEC;
    line-height: 44px;
    margin-left: 30px;
    margin-top: 18px;
    a {
      display: flex;
      align-content: center;
      color: #ECECEC;
    }
    div {
      margin-top: -7px;
      margin-left: 15px;
    }
  }
  
  .errorShip {
    margin-top: 50px;
    position: relative;
    svg {
      width: 325px;
      height: 325px;
      opacity: 0.50;
    }
  }
  
  .firstFour {
    position: absolute;
    top: 265px;
    left: 130px;
    font-size: 60px;
    color: #7E7C7C;
    font-weight: 800;
  }
  
  .zero {
    position: absolute;
    top: 230px;
    left: 220px;
    font-size: 60px;
    color: #7E7C7C;
    font-weight: 800;
  }
  
  .secondFour {
    position: absolute;
    top: 250px;
    left: 340px;
    font-size: 60px;
    color: #7E7C7C;
    font-weight: 800;
  }
`;