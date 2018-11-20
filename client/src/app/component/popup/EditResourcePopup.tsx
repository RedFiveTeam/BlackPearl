import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledPopupModal } from './PopupModal';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { InputValidation } from '../../utils/inputValidation/InputValidation';
import { CSSProperties } from 'react';
import { ProfileStore } from '../../profile/ProfileStore';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  profileStore?: ProfileStore;
}

interface State  {
  title: string;
  url: string;
  urlError: string;
  titleError: string;
  urlCSS: CSSProperties;
  titleCSS: CSSProperties;
}

@observer
export class EditResourcePopup extends React.Component<Props, State> {
  state = {
    title: this.props.resourceStore!.pendingEdit!.name,
    url: this.props.resourceStore!.pendingEdit!.url,
    urlError: '',
    titleError: '',
    urlCSS: {},
    titleCSS: {}
  };

  onTitleFieldChange = (e: any) => {
    this.setState({title: e.target.value});
  };

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

  async onSaveButtonClick() {
    let valid = new InputValidation();
    let survivedEverything: boolean = true;
    this.setState({urlError: '', titleError: '', urlCSS: {}, titleCSS: {}});

    if (this.state.title === '') {
      survivedEverything = false;
      this.setState({titleError: 'Please enter a title'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.state.url === '') {
      survivedEverything = false;
      this.setState({urlError: 'Please enter an address'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    } else if (!valid.isResourceValid(this.state.url)) {
      survivedEverything = false;
      this.setState({urlError: 'Please enter a valid address (https://www...)'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    }

    if (survivedEverything) {
      this.props.resourceStore!.pendingEdit!.setUrl(this.state.url);
      this.props.resourceStore!.pendingEdit!.setName(this.state.title);
      this.props.resourceStore!.pendingEdit!.setAccountId(this.props.profileStore!.profile.cardID);
      await this.props.resourceActions!.updateResource();
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          className="editPopup"
          title="Edit Resource"
          onCancel={() => {
            this.props.resourceActions!.clearPendingEdit();
          }}
        >
          <input
            className="pendingEditTitle"
            type="text"
            maxLength={64}
            style={this.state.titleCSS}
            placeholder={this.props.resourceStore!.pendingEdit!.name}
            value={this.state.title}
            onChange={(e) => this.onTitleFieldChange(e)}
          />
          {
            this.state.titleError !== '' &&
            <div className="titleError">{this.state.titleError}</div>
          }
          <input
            className="pendingEditUrl"
            type="text"
            style={this.state.urlCSS}
            placeholder={this.props.resourceStore!.pendingEdit!.url}
            value={this.state.url}
            onChange={(e) => this.onUrlFieldChange(e)}
          />
          {
            this.state.urlError !== '' &&
            <div className="urlError">{this.state.urlError}</div>
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

export const StyledEditResourcePopup = inject(
  'resourceActions',
  'resourceStore',
  'profileStore'
)(styled(EditResourcePopup)`
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
  
  .titleError {
    position: absolute;
    top: 108px;
    left: 20px;
    color: #A40000;
  }
  
  .urlError {
    position: absolute;
    top: 167px;
    left: 20px;
    color: #A40000;
  }
  
  input {
    padding-left: 7px;
    box-sizing: border-box;
    outline: none;
  }
  
  .pendingEditTitle {
    position: absolute;
    font-family: Amaranth;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 67px;
    bottom: 89px;
    left: 12px;
    color: black;
    text-align: left;
  }
  
  .pendingEditUrl {
    position: absolute;
    font-family: Amaranth;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 127px;
    bottom: 89px;
    left: 12px;
    color: black;
    text-align: left;
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
    cursor: pointer;
    outline: 0px;
    color: #FFFFFF;
    border: solid #65768B;
  }
  
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 6%;
    border: solid #65768B;
    background: #FFFFFF;
    color: #65768B;
  }

`);