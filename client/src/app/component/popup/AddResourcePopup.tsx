import * as React from 'react';
import { StyledPopupModal } from './PopupModal';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { inject } from 'mobx-react';
import { CSSProperties } from 'react';
import { InputValidation } from '../../utils/inputValidation/InputValidation';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
}

interface State {
  title: string;
  url: string;
  urlError: string;
  titleError: string;
  urlCSS: CSSProperties;
  titleCSS: CSSProperties;
}

export class AddResourcePopup extends React.Component<Props, State> {
  state = {title: '', url: '', urlError: '', titleError: '', urlCSS: {}, titleCSS: {}};

  onTitleFieldChange = (e: any) => {
    this.setState({title: e.target.value});
  };

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

  async onSaveButtonClick() {
    let inputValidation = new InputValidation();
    let survivedEverything: boolean = true;
    this.setState({urlError: '', titleError: '', urlCSS: {}, titleCSS: {}});

    if (this.state.title === '') {
      survivedEverything = false;
      this.setState({titleError: 'Please enter a title'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.props.resourceActions!.checkDuplicates(this.state.title)) {
      survivedEverything = false;
      this.setState({titleError: 'Resource already exists'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.state.url === '') {
      survivedEverything = false;
      this.setState({urlError: 'Please enter an address'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    } else if (!inputValidation.isValidResource(this.state.url)) {
      survivedEverything = false;
      this.setState({urlError: 'Please enter a valid address (https://www...)'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    }

    if (survivedEverything) {
      this.props.resourceActions!.updatePendingResource(
        this.state.title,
        this.state.url
      );
      await this.props.resourceActions!.saveResource();
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          title="Add Resource"
          onCancel={() => {
            this.props.resourceActions!.clearPendingResource();
          }}
        >
          <input
            value={this.state.title}
            className="titleField"
            type="text"
            style={this.state.titleCSS}
            maxLength={64}
            placeholder="Title"
            onChange={(e) => this.onTitleFieldChange(e)}
          />
          {
            this.state.titleError !== '' &&
            <span className="titleError">{this.state.titleError}</span>
          }
          <br/>
          <input
            value={this.state.url}
            className="urlField"
            type="text"
            style={this.state.urlCSS}
            placeholder="Address (i.e. https://www...)"
            onChange={(e) => this.onUrlFieldChange(e)}
          />
          {
            this.state.urlError !== '' &&
            <span className="urlError">{this.state.urlError}</span>
          }
          <button
            className="saveButton"
            onClick={async () => { await this.onSaveButtonClick(); }}
          >
            SAVE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledAddResourcePopup = inject('resourceActions')(styled(AddResourcePopup)`
  .modal {
   width: 514px;
   height: 250px;
  }
  
  .title {
    height: 61px;
    width: 514px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  
  .titleError {
    position: absolute;
    top: 105px;
    left: 20px;
    color: #A40000;
  }
  
  .urlError {
    position: absolute;
    top: 166px;
    left: 20px;
    color: #A40000;
  }
  
  input {
    font-family: Amaranth;
    background: #C4C4C4;
    border: 2px solid #C4C4C4;
    width: 490px;
    height: 40px;
    left: 480px;
    top: 429px;
    font-size: 24px;
    outline: none;
    ::placeholder {
      padding-left: 8px;
      opacity: 0.5;
      color: black;
    }
  }
  
  .titleField {
    margin-bottom: 15px;
  }
  
  .urlField {
    margin-bottom: 10px;
  }
  
  .saveButton {
    position: absolute;
    left: 15%;
    bottom: 6%;
    background: #65768B;
    font-family: Amaranth;
    width: 157px;
    height: 49px;
    font-size: 24px;
    outline: 0px;
    border: solid #65768B;
    color: #FFFFFF;
    border-radius: 3px;
  }
    
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 6%;
    background: #FFFFFF;
    border: solid #65768B;
    color: #65768B;
    border-radius: 3px;
  }
`);