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
          title="Are you sure you want to delete this resource?"
          onCancel={() => {
            this.props.resourceActions!.clearPendingDelete();
          }}
        >
          <output
            className="pendingDeleteTitle"
            title={this.props.resourceStore!.pendingDelete!.name}
          >
            {this.props.resourceStore!.pendingDelete!.name}
          </output>
          <button
            className="confirmButton"
            onClick={this.onClick}
          >
            DELETE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledRemoveResourcePopup = inject('resourceActions', 'resourceStore')(styled(RemoveResourcePopup)`
  .modal {
  width: 514px;
  height: 190px;
  }
  
  .title {
  height: 61px;
  width: 514px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  }
  
  .pendingDeleteTitle {
    position: absolute;
    font-family: Amaranth;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 61px;
    bottom: 89px;
    left: 12px;
    right: 56px;
    opacity: 0.5;
    color: black;
    text-align: left;
    padding-left: 7px;
    box-sizing: border-box;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .confirmButton {
    position: absolute;
    left: 15%;
    bottom: 20px;
    background: #844646;
    font-family: Amaranth;
    width: 157px;
    height: 49px;
    font-size: 24px;
    cursor: pointer;
    outline: 0px;
    border: solid #844646;
    color: #FFFFFF;
  }
  
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 20px;
    background: white;
    border: solid #844646;
    color: #844646;
  }

`);