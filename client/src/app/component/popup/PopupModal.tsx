import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  onCancel?: () => void;
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
          {
            this.props.onCancel &&
            <button
              className="cancelButton"
              onClick={this.props.onCancel}
            >
              CANCEL
            </button>
          }
          </div>
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
  z-index: 75;
  text-align: center;
  
  .modal {
    border-radius: 4px;
    background: #292E33;
    width: 498px;
    height: 346px;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
  
  .body {
    background-color: #292E33;
  }
  
  .title {
    border-radius: 4px 4px 0 0;
    background-color: #4377CF;
    width: 100%;
    height: 66px;
    line-height: 66px;
    vertical-align: middle;
    font-size: 36px;
    margin: 0px;
    color: white;
  }
  
  .cancelButton {
    font-weight: 500;
    font-size: 14px;
    color: #76ADED;
    background: #292E33;
    border: none;
  }
  
  .cancelButton:hover {
    cursor: pointer;
  }
`;