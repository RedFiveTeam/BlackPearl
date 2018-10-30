import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  onCancel: () => void;
  title: string;
  body?: any;
  children?: any;
}

@observer
export class PopupModal extends React.Component<Props> {

  render() {
    return (
      <div className={this.props.className}>
        <div className="modal">
          <p
            className="title"
          >
            {this.props.title}
          </p>
          <div className="body">
            {this.props.children}
          </div>
          <button
            className="cancelButton"
            onClick={this.props.onCancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  }
}

export const StyledPopupModal = styled(PopupModal)`
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 1;
  text-align: center;
  font-family: Amaranth;
  
  .modal {
    border-radius: 10px;
    background: #F6F6F6;
    width: 544px;
    height: 308px;
    margin-left: -272px; // negative half width
    margin-top: -154px;  // negative half height
    left: 50%;
    top: 50%;
    position: absolute;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
  
  .title {
  font-size: 24px;
  margin: 0px;
  padding-top: 4%;
  padding-bottom: 2%;
  }
  
  .cancelButton {
  background: #C4C4C4;
  font-family: Amaranth;
  width: 157px;
  height: 49px;
  font-size: 24px;
  outline: 0px;
  }
  
  .cancelButton:hover {
  cursor: pointer;
  }
`;