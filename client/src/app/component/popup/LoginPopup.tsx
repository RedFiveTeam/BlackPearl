import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { LoginActions } from '../login/LoginActions';

const login = require('../../icon/LoginBackground.png');
const pearl = require('../../icon/PearlIcon.png');

interface Props {
  className?: string;
  profileStore?: ProfileStore;
  profileActions?: ProfileActions;
  resourceActions?: ResourceActions;
  loginActions?: LoginActions;
}

@observer
export class LoginPopup extends React.Component<Props> {
  state = {userNameText: '', userNameCSS: {}};
  userNameInput: any;

  constructor(props: Props) {
    super(props);
    this.userNameInput = React.createRef();
  }

  componentDidMount() {
    this.focusInput();
    document.addEventListener('keydown', this.handleEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEnter);
  }

  async componentWillMount() {
    await this.props.profileActions!.getAllProfiles();
  }

  focusInput() {
    this.userNameInput.current!.focus();
  }

  handleEnter = async (e: any) => {
    if (e.keyCode === 13) {
      await this.submitClick();
    }
  };

  submitClick = async () => {
    let valid: boolean = true;
    this.setState({userNameTest: '', userNameCSS: {}});

    if (!this.props.loginActions!.validateLogin(this.props.profileStore!.username)) {
      valid = false;
      this.setState({userNameText: 'Please Enter Your SIPR Email'});
      this.setState({userNameCSS: {'borderBottom': 'solid 2px #A40000'}});
    }
    if (!this.props.profileStore!.username || this.props.profileStore!.username === '') {
      valid = false;
      this.setState({userNameText: 'Please Enter a Username'});
      this.setState({userNameCSS: {'borderBottom': 'solid 2px #A40000'}});
    }
    if (valid) {
      await this.props.loginActions!.login(this.props.profileStore!.username);
      this.props.profileStore!.setHasProfile(true);
      await this.props.resourceActions!.setAllResources();
    }
  };

  loginAsGuest = async () => {
    await this.props.loginActions!.loginAsGuest();
    await this.props.resourceActions!.setAllResources();
  };

  render() {
    return (
      <div
        className={this.props.className + ' loginPopup'}
      >
        <div
          className={'backBackground'}
        >
          <img
            className={'background'}
            src={login}
          />
        </div>
        <div
          className={'loginContent'}
        >
          <div
            className={'title'}
          >
            <img src={pearl}/>
            <span>The Black Pearl</span>
          </div>
          <div className={'userNameInfo'}>
            <div
              className={'group'}
            >
              <input
                id="userName"
                onChange={(e: any) => {
                  this.props.profileStore!.setUsername(e.target.value);
                }}
                autoComplete={'off'}
                required={true}
                style={this.state.userNameCSS}
                ref={this.userNameInput}
              />
              <span className={'emailSuffix'}>@mail.smil.mil</span>
              <span className="highlight"/>
              <span className="bar"/>
              <label htmlFor="#userName">Username (SIPR Email)</label>
            </div>
            {
              this.state.userNameText !== '' &&
              <span className={'usernameError'}>{this.state.userNameText}</span>
            }
            <div className={'helpMessage'}>
              Please enter the prefix of your SIPR Email to log into The Black Pearl.
            </div>
          </div>
          <div className={'loginButtons'}>
            <button
              className={'guestButton'}
              onClick={
                this.loginAsGuest
              }
            >
              CONTINUE AS GUEST
            </button>
            <button
              className={'submitButton'}
              onClick={this.submitClick}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledLoginPopup = inject('loginActions', 'profileStore', 'profileActions', 'resourceActions')
(styled(LoginPopup)`  

  z-index: 50;
  height:100%;
   
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: .4;
  }
  
  .backBackground {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: black;
  }
  
  .loginContent {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 495px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    justify-content: space-between;
  }
  
  .loginButtons {
    display: flex;
    justify-content: center;
  }
  
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    text-align: center;
    width: auto;
    font-weight: 600;
    font-size: 48px;
    color: #FBFDFF;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
    align-items: flex-end;
    
    span {
      line-height: 53px;
      margin-left: 20px;
    }
  }
  
  .helpMessage {
    text-align: center;
    width: 356px;
    font-size: 14px;
    color: #FFF;
    display: flex;
    margin: auto;
    padding-top: 20px;
  }
  
  .group {
    display: inline-block;
    margin: auto;
    position: relative;
  }
  
  input {
    padding-bottom: 5px;
    padding-left: 0;
    padding-right: 0;
    display: inline-block;
    width: 280px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.0);
    color: #FFF;
    font-size: 24px;
  }
  
  input:focus {
    outline: none;
  }
  
  label {
    color: #93A7C3;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 5px;
    font-size: 18px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  
  input:focus ~ label, input:valid ~label {
    top: -20px;
    font-size: 18px;
    color: #5386F2;
    opacity: 1;
  }
  
  .emailSuffix {
    color: #FFF;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    margin-left: 16px;
  }
  
  .guestButton {
    font-weight: 500;
    width: 180px;
    font-size: 14px;
    color: #FFF;
    border: 1px solid #5386F2;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    background: none;
    padding: 10px;
    border-radius: 2px;
    margin-right: 16px;
    cursor: pointer;
      
      :hover {
        background: #5386F2;
      }
  }
  
  .submitButton {
    background: linear-gradient(to bottom,#207cca 11%,#207cca 11%,#207cca 27%,#207cca 44%,#1e5799 100%);
    font-weight: 500;
    font-size: 14px;
    color: #FFF;
    width: 180px;
    border-radius: 2px;
    border: none;
    cursor: pointer;
  }
  
  .bar {
    position: relative;
    display: block;
    width: 280px;
  }
  
  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #5386F2;
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

  .usernameError {
    color: red;
    position: relative;
    display: flex;
    top: 6px;
    left: 50px;
  }
`);
