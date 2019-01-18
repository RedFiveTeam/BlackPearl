import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { CopyIcon } from '../../../icon/CopyIcon';
import { toast } from 'react-toastify';

interface Props {
  className?: string;
  imageServer: string;
  callOutFormat: string;
  imageServerJWICS: string;
  auabServer: string;
  navcentServer: string;
  dsnNumber: string;
  svoipNumber: string;
  tsvoipNumber: string;
  jwicsServer: string;
}

@observer
export class InformationCard extends React.Component<Props> {

  copyToClipboard(e: any) {
    let ele = e.target.querySelector('.info > span:nth-of-type(2)');
    if (ele) {
      let text = ele.innerHTML;
      let selected = null;
      let el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.getElementsByClassName('topBar')[0].appendChild(el);
      if (document.getSelection()!.rangeCount > 0) {
        selected = document.getSelection()!.getRangeAt(0);
      }
      el.select();
      document.execCommand('copy');
      document.getElementsByClassName('topBar')[0].removeChild(el);
      if (selected) {
        document.getSelection()!.removeAllRanges();
        document.getSelection()!.addRange(selected);
      }
      toast.success('Information Copied to Clipboard');
    }
  }

  showCopy(e: any) {
    let el = (e.target.querySelector('svg') as HTMLSpanElement);
    if (el) {
      el.style.setProperty('display', 'inline-block');
    }
  }

  hideCopy(e: any) {
    let el = (e.target.querySelector('svg') as HTMLSpanElement);
    if (el) {
      el.style.setProperty('display', 'none');
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="cardTitle">
          General Info
        </div>
        <div className="cardContent">
          <div className="row">
            <div
              className="cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>Image Server:</span>
                <span>{this.props.imageServer}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>Image Server (JWICS):</span>
                <span>{this.props.imageServerJWICS}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="cell"
            >
              <div className="info">
                <span>Call Out Format:</span>
                <span>{this.props.callOutFormat}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>JWICS:</span>
                <span>{this.props.jwicsServer}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>AUAB:</span>
                <span>{this.props.auabServer}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>NAVCENT:</span>
                <span>{this.props.navcentServer}</span>
              </div>
              <CopyIcon/>
            </div>
          </div>
          <div className="row">
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>DSN:</span>
                <span>{this.props.dsnNumber}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>SVOIP:</span>
                <span>{this.props.svoipNumber}</span>
              </div>
              <CopyIcon/>
            </div>
            <div
              className="oneThirdCell cell"
              onClick={this.copyToClipboard}
              onMouseOver={this.showCopy}
              onMouseLeave={this.hideCopy}
            >
              <div className="info">
                <span>TSVOIP:</span>
                <span>{this.props.tsvoipNumber}</span>
              </div>
              <CopyIcon/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export const StyledInformationCard = styled(InformationCard)`
    display: block;
    position: relative;
    width: 100%;
    height: 160px;
    color: #757575;
    margin-bottom: 10px;
    
    .cardTitle {
      background-color: #1F2226;
      font-size: 24px;
      height: 32px;
      text-align: center;
      color: #FFF;
      border-radius: 10px 10px 0px 0px;
      margin-bottom: 5px;
      box-shadow: -1px 3px 3px rgba(0,0,0,.25);
    }
    
    .cardContent {
      background-color: #1F2226;
      height: 114px;
      padding-top: 5px;
      padding-bottom: 5px;
      width: 100%;
      border-radius: 0px 0px 10px 10px;
      box-shadow: -1px 3px 3px rgba(0,0,0,.25);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .row {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 36px;
    }
    
    .cell {
      background: #292E33;
      height: 100%;
      display: flex;
      margin: 1px;
      align-items: center;
      position: relative;
      cursor: pointer;
    }
    
    .row:first-of-type > .cell:nth-of-type(3) {
      cursor: default;
    }
    
    .info {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      pointer-events: none;
      color: #FFFFFF;
    }
    
    .info > span:first-of-type {
      color: #8698B2;
    }
    
    .row:nth-of-type(1) {
      .cell:nth-of-type(1) {
        width: 27%;
      }
  
      .cell:nth-of-type(2) {
        width: 27%;
      }
  
      .cell:nth-of-type(3) {
        width: 45%;
      }
    }

    .oneThirdCell {
      width: 33%;
    }
        
    svg {
      display: none;
      pointer-events: none;
      position: absolute;
      right: 5px;
    }
    
    span {
      margin-left: 8px;
      pointer-events: none;
    }
    
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
  svg {
    top: 5px;
  }
}
`;