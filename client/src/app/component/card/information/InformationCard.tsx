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
    let text = e.target.querySelector('span:nth-child(2)').innerHTML.replace(/\([A-z]*\)/, '');
    let selected = null;
    let el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0);
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    toast.success('Information Copied to Clipboard');
  }

  showCopy(e: any) {
    (e.target.querySelector('svg') as HTMLElement).style.setProperty('display', 'inline-block');
  }

  hideCopy(e: any) {
    (e.target.querySelector('svg') as HTMLElement).style.setProperty('display', 'none');
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="cardTitle">
          General Info
        </div>
        <div className="cardContent">
          <div className="table">
            <div className="information">
              <div className="row">
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title no">Image Server:</span>
                  <span className="imageServer">{this.props.imageServer}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title no">Image Server (JWICS):</span>
                  <span className="imageServerJWICS">{this.props.imageServerJWICS}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                >
                  <span className="title no">Call Out Format:</span>
                  <span className="callOutFormat">{this.props.callOutFormat}</span>
                </div>
              </div>
              <div className="row">
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">JWICS:</span>
                  <span className="jwicsServer">{this.props.jwicsServer}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">AUAB:</span>
                  <span className="auabServer">{this.props.auabServer}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">NAVCENT:</span>
                  <span className="navcentServer">{this.props.navcentServer}</span>
                  <CopyIcon/>
                </div>
              </div>
              <div className="row">
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">DSN:</span>
                  <span className="dsnNumber">{this.props.dsnNumber}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">SVOIP:</span>
                  <span className="svoipNumber">{this.props.svoipNumber}</span>
                  <CopyIcon/>
                </div>
                <div
                  className="d"
                  onClick={this.copyToClipboard}
                  onMouseOver={this.showCopy}
                  onMouseLeave={this.hideCopy}
                >
                  <span className="title">TSVOIP:</span>
                  <span className="tsvoipNumber">{this.props.tsvoipNumber}</span>
                  <CopyIcon/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export const StyledInformationCard = styled(InformationCard)`

    position: absolute;
    width: 1078px;
    height: 160px;
    font-family: Amaranth;
    color: #757575;
    padding-left: 6px;
    
    .cardTitle {
      background-color: #364958;
      font-size: 24px;
      height: 32px;
      text-align: center;
      color: #FFF;
      border-radius: 10px 10px 0px 0px;
      margin-bottom: 5px;
      box-shadow: -1px 3px 3px rgba(0,0,0,.25);
    }
    .cardContent {
      background-color: #EAEAEA
      height: 124px;
      width: 1076px;
      border-radius: 0px 0px 10px 10px;
      box-shadow: -1px 3px 3px rgba(0,0,0,.25);
    }
    
    .table {
      height: 112px;
      border: 6px solid #EAEAEA;
      width: 1066px;
      border-radius: 0px 0px 10px 10px;
    }
    
    .title {
      font-weight: bold;
      color: #000000;
    }
    
    .table, .d {
      background-color: #FFFFFF;
      border: 1px solid #EAEAEA;
    }
    
    .d {
      display: table-cell;
      height: 36px;
      vertical-align: middle;
      cursor: pointer;
    }
    
    .d > svg {
      display: none;
      pointer-events: none;
    }
    
    .show {
      display: block;
    }
    
    .table {
      font-size: 14px;
      width: 100%;
      height: 100%;
      background: #EAEAEA;
    }

    .row:nth-child(1) {
      div:nth-child(1) {
        width: 268px;
        svg {
          position: absolute;
        }
      }
      
      div:nth-child(2) {
        width: 307px;
        svg {
          position: absolute;
        }
      }
      
      div:nth-child(3) {
        width: 484px;
        cursor: unset;
        svg {
          position: absolute;
          right: 7px;
        }
      }
    }
    
    span {
      margin-left: 8px;
      pointer-events: none;
    }
    
    .row:nth-child(n+2) > div {
      width: 353px;
    }
    
    span:not(.no) {
      margin-right: 15px;
    }
    
    .information {
      //margin-top: 5px;
      border: 5px solid #EAEAEA;
      border-radius: 10px;
    }

    svg { 
      width: 16px;
      height: 16px;
      float: right;
      margin-right: 10px;
    }
    
    .imageServer {
      margin-right: 0px;
    }
`;