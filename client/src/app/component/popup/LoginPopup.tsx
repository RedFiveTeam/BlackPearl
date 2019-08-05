import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { LoginActions } from '../login/LoginActions';

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

  async componentWillMount() {
    await this.props.profileActions!.getAllProfiles();
    this.focusInput();
    document.addEventListener('keydown', async event => {
      if (event.keyCode === 13) {
        await this.submitClick();
      }
    });
  }

  focusInput() {
    this.userNameInput.current!.focus();
  }

  submitClick = async () => {
    let valid: boolean = true;
    this.setState({userNameTest: '', userNameCSS: {}});

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
        className={this.props.className}
      >
        <StyledPopupModal
          title="User Login"
        >
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
            <span className="highlight"/>
            <span className="bar"/>
            <label htmlFor="#userName">UserName</label>
          </div>
          {
            this.state.userNameText !== '' &&
            <span className={'usernameError'}>{this.state.userNameText}</span>
          }
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
          <div
            className={'oldProfileText'}
            onClick={() => {
              this.props.profileStore!.setHasOldProfile(true);
              this.props.profileStore!.setHasProfile(true);
            }}
          >
            Previously logged in with a SIPR token? <br/>
            <a className={'clickHere'}>Click Here </a>
            to link to your old account
          </div>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledLoginPopup = inject('loginActions', 'profileStore', 'profileActions', 'resourceActions')
(styled(LoginPopup)`
  

  .oldProfileText {
    position: absolute;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    width: 100%;
    top: 200px;
  }
  
  .group {
    margin: auto;
    position: relative;
    width: 280px;
    top: 48px;
  }
  
  .clickHere {
    color: #4377CF;
  }
  
  a {
  color: #FFF;
    cursor: pointer;
  }
  
  .autocomplete {
    width: 131px;
    height: auto;
    background-color: #1A2128;
    position: absolute;
    left: 87px;
    color: #FFF;
  }
  
    input {
    padding-bottom: 5px;
    padding-left: 0;
    padding-right: 0;
    display: block;
    width: 280px;
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
    width: 280px;
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
  
  .guestButton {
    cursor: pointer;
    position: absolute;
    bottom: 6%;
    right: 36%;
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
     position: absolute;
     cursor: pointer;
     border-radius: 2px;
     right: 6%;
     bottom: 6%;
     color: #FFFFFF;
     background-image: linear-gradient(to bottom, #679CF6 11%,#679CF6 11%,#679CF6 27%,#679CF6 44%,#4072EE 100%);
     border: none; 
     width: 136px;
     height: 36px;
     font-size: 14px;
   }
   
   .usernameError {
    color: red;
    position: relative;
    top: 50px;
   }
`);