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
          title="Are you sure you want to delete this acronym?"
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
              await this.props.acronymStore!.setSearch('');
              await this.props.acronymStore!.setSearch(this.props.acronymStore!.search);
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
    width: 371px;
    height: 111px;
  }
  
  .title {
    font-size: 18px;
  }
  
  .acronymString {
    background: #C4C4C4;
    width: 301px;
    height: 22px;
    margin: auto;
    text-align: left;
    padding-left: 5px;
    color: #000000;
  }
  
  .cancelButton {
    height: 25px;
    width: 110px;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    position: absolute;
    bottom: 7px;
    left: 67px;
    justify-content: center;
  }
  
  .deleteButton {
    background: #854646;
    height: 25px;
    width: 110px;
    line-height: 0;
    font-size: 18px;
    font-family: Amaranth;
    display: flex;
    position: absolute;
    bottom: 7px;
    right: 63px;
    justify-content: center;
    color: #fff;
  }
}
`);