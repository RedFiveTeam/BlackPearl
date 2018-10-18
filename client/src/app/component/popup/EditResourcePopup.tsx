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

interface State  {
  title: string;
  url: string;
}

@observer
export class EditResourcePopup extends React.Component<Props, State> {
  state = {title: this.props.resourceStore!.pendingEdit!.name, url: this.props.resourceStore!.pendingEdit!.url};

  onTitleFieldChange = (e: any) => {
    this.setState({title: e.target.value});
  };

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

  onClick = async () => {
    this.props.resourceStore!.pendingEdit!.setUrl(this.state.url);
    this.props.resourceStore!.pendingEdit!.setName(this.state.title);
    await this.props.resourceActions!.updateResource();
  };

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          className="editPopup"
          title="EDIT RESOURCE"
          onCancel={() => {
            this.props.resourceActions!.clearPendingEdit();
          }}
        >
          <input
            className="pendingEditTitle"
            type="text"
            placeholder={this.props.resourceStore!.pendingEdit!.name}
            value={this.state.title}
            onChange={(e) => this.onTitleFieldChange(e)}
          />
          <input
            className="pendingEditUrl"
            type="text"
            placeholder={this.props.resourceStore!.pendingEdit!.url}
            value={this.state.url}
            onChange={(e) => this.onUrlFieldChange(e)}
          />
          <button
            className="saveButton"
            onClick={this.onClick}
          >
            SAVE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledEditResourcePopup = inject('resourceActions', 'resourceStore')(styled(EditResourcePopup)`
  .modal {
  width: 514px;
  height: 250px;
  }
  
  .title {
  height: 80px;
  width: 514px;
  padding-top: 21px;
  padding-bottom: 19px;
  }
  
  input {
  padding-left: 7px;
  box-sizing: border-box;
  }
  
  .pendingEditTitle {
    position: absolute;
    font-family: Acme;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 67px;
    bottom: 89px;
    left: 12px;
    opacity: 0.5;
    color: black;
    text-align: left;
  }
  
  .pendingEditUrl {
    position: absolute;
    font-family: Acme;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 127px;
    bottom: 89px;
    left: 12px;
    opacity: 0.5;
    color: black;
    text-align: left;
  }
  
  .saveButton {
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