import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { AcronymStore } from '../widgets/acronym/AcronymStore';
import { AcronymActions } from '../widgets/acronym/actions/AcronymActions';

interface Props {
  className?: string;
  acronymStore?: AcronymStore;
  acronymActions?: AcronymActions;
}

@observer
export class DeleteAcronymPopup extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          title="Delete Acronym"
          className="popupModal"
          onCancel={() => {
            this.props.acronymStore!.setPendingDelete(null);
          }}
        >
          <p
            className="acronymString"
          >
            {this.props.acronymStore!.pendingDelete!.acronym}
          </p>
          <button
            onClick={async () => {
              await this.props.acronymActions!.deleteAcronym(this.props.acronymStore!.pendingDelete!);
            }}
            className="deleteButton"
          >
            DELETE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledDeleteAcronymPopup = inject('acronymStore', 'acronymActions')(styled(DeleteAcronymPopup)`
.popupModal {
  border-radius: 5px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  .modal {
    width: 500px;
    height: 250px;
  }
  
  .title {
    font-size: 36px;
  }
  
  .acronymString {
    background: #C4C4C4;
    width: 440px;
    height: 40px;
    margin: auto;
    text-align: left;
    padding-left: 5px;
    color: #000000;
    position: absolute;
    top: 114px;
    left: 27px;
    right: 56px;
    bottom: 89px;
    opacity: 0.5;
    text-overflow: ellipsis;
    font-size: 24px;
    line-height: 40px;
  }
  
  .deleteButton {
    position: absolute;
    cursor: pointer;
    border-radius: 2px;
    right: 11%;
    bottom: 6%;
    color: #FFFFFF;
    background-image: linear-gradient(to bottom, #a90329 17%,#8f0222 42%,#6d0019 81%);
    border: none;
    width: 94px;
    height: 36px;
  }
  
  .cancelButton {
    position: absolute;
    right: 34%;
    bottom: 6%;
    color: #FFFFFF;
  }
}
`);