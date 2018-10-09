import * as React from 'react';
import { StyledPopupModal } from './PopupModal';
import styled from 'styled-components';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { inject } from 'mobx-react';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
}

interface State {
  title: string;
  url: string;
}

export class AddResourcePopup extends React.Component<Props, State> {
  state = {title: '', url: ''};

  onTitleFieldChange = (e: any) => {
    this.setState({title: e.target.value});
  };

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

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
            value={this.state.title}
            className="titleField"
            type="text"
            placeholder="TITLE"
            onChange={(e) => this.onTitleFieldChange(e)}
          /><br/>
          <input
            value={this.state.url}
            className="urlField"
            type="text"
            placeholder="URL"
            onChange={(e) => this.onUrlFieldChange(e)}
          />
          <button
            className="saveButton"
            onClick={async () => {
              this.props.resourceActions!.updatePendingResource(
                this.state.title,
                this.state.url
              );
              await this.props.resourceActions!.saveResource();
            }}
          >
            SAVE
          </button>
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
  
  .saveButton {
    position: absolute;
    left: 15%;
    bottom: 6%;
    
    background: #C4C4C4;
    font-family: Acme;
    width: 157px;
    height: 49px;
    font-size: 24px;
  }
  
  .titleField {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  .urlField {
    margin-bottom: 10px;
  }
`);