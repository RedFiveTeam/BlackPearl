import * as React from 'react';
import { StyledPopupModal } from './PopupModal';
import styled from 'styled-components';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { inject } from 'mobx-react';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
}

export class AddResourcePopup extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className}>
      <StyledPopupModal
        title="ADD RESOURCE"
        onCancel={() => {
          this.props.resourceActions!.clearPendingResource();
        }}
      >
        <input
          className="titleField"
          type="text"
          placeholder="TITLE"
        /><br/>
        <input
          className="urlField"
          type="text"
          placeholder="URL"
        />
      </StyledPopupModal>
      </div>
    );
  }
}
export const StyledAddResourcePopup = inject('resourceActions')(styled(AddResourcePopup)`

  input {
  font-family: Acme;
  background: #C4C4C4;
  border: none;
  width: 478px;
  height: 40px;
  left: 480px;
  top: 429px;
  font-size: 24px;
  }
  
  input::placeholder {
  padding-left: 8px;
  opacity: 0.5;
  color: black;
  }
  
  .cancelButton {
  position: absolute;
  right: 15%;
  bottom: 6%;
  }
  
  .titleField {
  margin-top: 10px;
  margin-bottom: 20px;
  }
  
  .urlField {
  margin-bottom: 10px;
  }
`);