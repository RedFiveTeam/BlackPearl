import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { StyledPopupModal } from './PopupModal';
import { ResourceStore } from '../../resource/stores/ResourceStore';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
}

@observer
export class RemoveResourcePopup extends React.Component<Props> {
  onClick = async () => {
    await this.props.resourceActions!.delete(this.props.resourceStore!.pendingDelete!.id!);
  };

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          className="deletePopup"
          title="ARE YOU SURE YOU WANT TO DELETE THIS RESOURCE?"
          onCancel={() => {
            this.props.resourceActions!.clearPendingDelete();
          }}
        >
          <output className="pendingDeleteTitle">
            {this.props.resourceStore!.pendingDelete!.name}
          </output>
          <button
            className="confirmButton"
            onClick={this.onClick}
          >
            CONFIRM
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledRemoveResourcePopup = inject('resourceActions', 'resourceStore')(styled(RemoveResourcePopup)`
  .modal {
  width: 544px;
  height: 210px;
  }
  
  .title {
  height: 80px;
  width: 544px;
  padding-top: 21px;
  padding-bottom: 19px;
  }
  
  .pendingDeleteTitle {
    position: absolute;
    font-family: Acme;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 33px;
    width: 437px;
    top: 88px;
    bottom: 89px;
    left: 51px;
    right: 56px;
    opacity: 0.5;
    color: black;
    padding-left: 8px;
    text-align: left;
  }
  
  .confirmButton {
    position: absolute;
    left: 15%;
    bottom: 6%;
    background: #C4C4C4;
    font-family: Acme;
    width: 157px;
    height: 49px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 6%;
  }

`);