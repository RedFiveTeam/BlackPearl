import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileModel } from '../../profile/ProfileModel';
import { LoginActions } from '../login/LoginActions';

const login = require('../../icon/LoginBackground.png');
const pearl = require('../../icon/PearlIcon.png');
const arrow = require('../../icon/BlueArrow.svg');

interface Props {
  className?: string;
  profileStore?: ProfileStore;
  loginActions?: LoginActions;
}

@observer
export class LinkProfilePopup extends React.Component<Props> {
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
          <div className={'suppliedInfo'}>
            <div>{this.props.profileStore!.username + '@mail.smil.mil'}</div>
            {this.props.profileStore!.approximateMatch ?
              <span>
                This account name doesn’t exist. Did you mean to log in as one of the users below?
              </span>
              :
              <span>
                It looks like you previously logged in to The Black Pearl using your SIPR Token!
              </span>
            }
          </div>
          <div className={'matchedInfo'}>
            {this.props.profileStore!.approximateMatch ?
              <span>
                Select your email from below
              </span>
              :
              <span>
                Select your name from below to keep your favorites
              </span>
            }
            <div>
              {
                this.props.profileStore!.loginMatches.map((p: ProfileModel, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={
                        async () => {
                          await this.props.loginActions!.loginAndLinkProfile(p);
                        }
                      }
                    >
                      <div
                        className={'nameRow'}
                      >
                        <span className={'nameList'}>{this.props.profileStore!.approximateMatch ?
                          <span>{p.altID}@mail.smil.mil</span> : <span>{p.cardID} </span>}
                        </span>
                        <span className={'selectButton'}>SELECT<img src={arrow}/></span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className={'or'}>OR</div>
          <div>
            <button
              onClick={
                async () => {
                  await this.props.loginActions!.createNewProfile(this.props.profileStore!.username);
                }
              }
            >
              CREATE A NEW ACCOUNT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledLinkProfilePopup = inject('profileStore', 'loginActions')(styled(LinkProfilePopup)`

  z-index: 51;
   
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: .4;
  }
  
  .backBackground {
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
  }
  
  .loginContent {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    justify-content: space-between;
  }
  
  .suppliedInfo {
    div {
      font-size: 18px;
      font-weight: 600;
      color: #fefefe;
      display: flex;
      justify-content: center;
      margin-bottom: 8px;
    }
    
    span {
      display: flex;
      font-size: 14px;
      color: #eeeeee;
      margin: auto;
      text-align: center;
      width: 357px;
    }
  }
  
  .matchedInfo {
  
    div {
      overflow: auto;
      width: 540px;
      height: 258px;
      border-radius: 4px;
      background-color: #000000;
      
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0;
        overflow: hidden !important;
        width: 100%;
        height: 49px;
        cursor: pointer;
        transition: background 0.2s;
        
        :hover {
          background: rgba(49, 50, 53, 0.5);
        }
        
        div {
          width: 508px;
          height: 99%;
          overflow: hidden !important;
          margin: auto;
          border-bottom: 1px solid #51575c;
          background: none !important;
          
          .nameList {
            font-size: 18px;
            color: #fff;
          }
      
          .selectButton {
            display: flex;
            font-size: 14px;
            font-weight: 600;
            color: #5487f2;
            
            img {
              margin-left: 8px;
            }
          }
        }
      }
    }
  
    span {
      font-size: 14px;
      color: #eeeeee;
    }
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
  
  button {
    width: 540px;
    height: 36px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
    border: solid 1px #5386f2;
    background: rgba(0, 0, 0, 0.0);
    cursor: pointer;
    transition: background 0.2s;
    
    :hover {
      background: #5386f2;
    }
  }
  
  .or {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #93a7c3;
  }
`);
