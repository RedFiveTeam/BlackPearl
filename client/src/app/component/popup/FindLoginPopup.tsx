import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { ProfileActions } from '../../profile/ProfileActions';
import { ProfileStore } from '../../profile/ProfileStore';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledAccountList } from '../list/AccountList';
import { LoginActions } from '../login/LoginActions';

interface Props {
  className?: string;
  loginActions?: LoginActions;
  profileActions?: ProfileActions;
  profileStore?: ProfileStore;
  resourceActions?: ResourceActions;
}

@observer
export class FindLoginPopup extends React.Component<Props> {
  state = {userNameText: '', userNameCSS: {}, profileBoxText: ''};

  async componentDidMount() {
    await this.props.profileActions!.getAllProfiles();
  }

  goBack = () => {
    this.props.profileStore!.setHasOldProfile(false);
    this.props.profileStore!.setHasProfile(false);
  };

  validateInputs = () => {
    this.setState({userNameText: '', userNameCSS: {}});

    if (this.props.profileStore!.isUserNameValid) {
      this.setState({userNameText: 'Please Enter Your New Username'});
      this.setState({userNameCSS: {'borderBottom': 'solid 2px #A40000'}});
    }

    if (!this.props.profileStore!.selectedProfile) {
      this.setState({profileBoxText: 'Please Select an Old Account'});
    } else {
      this.setState({profileBoxText: ''});
    }
  };

  loginButtonClick = async () => {
    this.validateInputs();
    if (await this.props.loginActions!.updateProfileWithExistingResources()) {
    await this.props.resourceActions!.setAllResources();
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          title="Link to an old account"
        >
          <div className={'group'}>
            <input
              id="findUsername"
              onChange={(e: any) => {
                this.props.profileStore!.setSearchValue(e.target.value);
                this.props.profileActions!.filterProfiles();
              }}
              required={true}
            />
            <span className="highlight"/>
            <span className="bar"/>
            <label htmlFor="#findUsername">First.Last</label>
          </div>
          <div
            className={'linkAccountTxt'}
          >
            Enter your name in First.Last format and select its match from the box below.
            If you do not see a match , please go back and create an account by logging in.
          </div>
          <StyledAccountList
            accountList={
              this.props.profileStore!.searchValue ?
                this.props.profileStore!.filteredProfileList :
                this.props.profileStore!.profiles
            }
          />
          {
            this.state.profileBoxText !== '' &&
            <span className={'profileBoxError'}>{this.state.profileBoxText}</span>
          }
          <div
            className={'group second'}
            id={'secondGroup'}
          >
            <input
              id="setUsername"
              onChange={(e: any) => {
                this.props.profileStore!.setUsername(e.target.value);
              }}
              required={true}
              style={this.state.userNameCSS}
            />
            <span className="highlight"/>
            <span className="bar"/>
            <label htmlFor="#findUsername">New Username</label>
          </div>
          {
            this.state.userNameText !== '' &&
            <span className="usernameError">{this.state.userNameText}</span>
          }
          <div
            className={'buttonGroup'}
          >
            <button
              className={'backButton'}
              onClick={this.goBack}
            >
              BACK
            </button>
            <button
              className={'submitButton'}
              onClick={this.loginButtonClick}
            >
              Submit
            </button>
          </div>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledFindLoginPopup = inject('loginActions', 'profileActions', 'profileStore', 'resourceActions')
(styled(FindLoginPopup)`
  
  #secondGroup {
    margin-top: 40px;
  }
 
  .modal {
    height: 503.37px;
    width: 600px;
  }
  
  
  .group {
    margin: auto;
    position: relative;
    top: 50px;
    width: 440px;
  }
  
  .accountList {
    color: #FFF;
    position: relative;
    margin: auto;
    background: black;
    min-height: 130px;
    max-height: 130px;
    overflow: auto;
    height: 135px;
    width: 540px;
    top: 60px;
  }
  
  .listRow{
    cursor: pointer;
    text-align: left;
    margin-top: 15px;
    padding-left: 30px;
  }

  .usernameError {
    color: red;
    position: relative;
    top: 50px;
  }
  
  .selected {
    background-color: #4377CF;
  }

    input {
    padding-bottom: 5px;
    padding-left: 0;
    padding-right: 0;
    display: block;
    width: 440px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: #292E33;
    color: #FFFFFF;
    font-size: 24px;
  }
  
  input:focus {
    outline: none;
  }
  
  label {
    color: #999;
    font-size: 14px;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 5px;
    opacity: 0.2;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  
  input:focus ~ label, input:valid ~label {
    top: -20px;
    font-size: 14px;
    color: #93A7C3;
    opacity: 1;
  }
  
  .bar {
    position: relative;
    display: block;
    width: 440px;
  }
  
  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0px;
    bottom: 0px;
    position: absolute;
    background: #93A7C3;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }
  
  .bar:before {
    left: 50%;
  }
  
  .bar:after {
    right: 50%;
  }
  
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }
  
  .highlight {
    position:absolute;
    height:60%; 
    width:100px; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0.5;
  }
  
  .backButton {
    cursor: pointer;
    position: relative;
    right: 16px;
    background: transparent;
    border-color: #5386F2;
    border-radius: 2px;
    width: 136px;
    height: 36px;
    font-size: 11px;
    color: #ffffff;
    letter-spacing: 0.2px;
    line-height: 14px;
    justify-content: center;
  }
  
  .submitButton {
    position: relative;
    cursor: pointer;
    border-radius: 2px;
    color: #FFFFFF;
    background-image: linear-gradient(to bottom, #679CF6 11%,#679CF6 11%,#679CF6 27%,#679CF6 44%,#4072EE 100%); 
    border: none;
    width: 94px;
    height: 36px;
    font-size: 14px;
   }
     
  .buttonGroup {
    position: relative;
    top: 76px;
    left: 339px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: flex-end;
  }
     
  .linkAccountTxt {
    color: #ffffff;
    position: relative;
    top: 65px;
    font-size: 14px;
    width: 506px;
    height: 57px;
    margin: auto;
  }
     
  .profileBoxError {
    color: red;
    top: 350px;
    width: 100%;
    left: 0px;
    position: absolute;
  }
`);
