import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileActions } from '../../profile/ProfileActions';

interface Props {
  className?: string;
  profileStore?: ProfileStore;
  profileActions?: ProfileActions;
}

@observer
export class ConfirmLogoutPopup extends React.Component<Props> {
  submitClick = () => {
    this.props.profileStore!.setHasProfile(false);
    this.props.profileStore!.setDisplayLogoutModal(false);
    this.props.profileActions!.deleteCookie();
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          onCancel={() => {
            this.props.profileStore!.setDisplayLogoutModal(false);
          }}
          title={'User Log Out'}
        >
          <span className="text">You are about to log out of The Black Pearl. Do you want to continue?</span>
          <button
            className={'confirmBtn'}
            onClick={this.submitClick}
          >
            YES
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledConfirmLogoutPopup = inject('profileStore', 'profileActions')(styled(ConfirmLogoutPopup)`

  .modal {
    height: 275px;
  }

  .title {
    font-weight: bold;
  }

  .text {
    color: #fff;
    align-self: center;
    width: 315px;
  }

  .body {
    margin-top: 30px;
    height: 180px;
    display: flex;
    flex-direction: column;
  }
  
  .cancelButton {
    cursor: pointer;
    border-radius: 2px;
    font-weight: 400;
    width: 150px;
    height: 30px;
    position: relative;
    bottom: 30px;
    color: #fff;
    margin-left: 95px;
    border: 1px solid #5386F2;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    
       :hover {
        background: #5386F2;
      }
  }
  
  .confirmBtn {
    background: linear-gradient(to bottom,#207cca 11%,#207cca 11%,#207cca 27%,#207cca 44%,#1e5799 100%);
    cursor: pointer;
    align-self: flex-end;
    margin-top: 75px;  
    margin-right: 85px;
    color: #fff;
    font-weight: 500;
    height: 30px;
    width: 150px;
    border: none;
    border-radius: 2px;
    font-size: 14px;
  }

`);
