import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

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
                <div className="d">
                  <span className="title no">Image Server:</span>
                  <span className="imageServer">{this.props.imageServer}</span>
                </div>
                <div className="d">
                  <span className="title no">Image Server (JWICS):</span>
                  <span className="imageServerJWICS">{this.props.imageServerJWICS}</span>
                </div>
                <div className="d">
                  <span className="title">Call Out Format:</span>
                  <span className="callOutFormat">{this.props.callOutFormat}</span>
                </div>
              </div>
              <div className="row">
                <div className="d">
                  <span className="title">JWICS:</span>
                  <span className="jwicsServer">{this.props.jwicsServer}</span>
                </div>
                <div className="d">
                  <span className="title">AUAB:</span>
                  <span className="auabServer">{this.props.auabServer}</span>
                </div>
                <div className="d">
                  <span className="title">NAVCENT:</span>
                  <span className="navcentServer">{this.props.navcentServer}</span>
                </div>
              </div>
              <div className="row">
                <div className="d">
                  <span className="title">DSN:</span>
                  <span className="dsnNumber">{this.props.dsnNumber}</span>
                </div>
                <div className="d">
                  <span className="title">SVOIP:</span>
                  <span className="svoipNumber">{this.props.svoipNumber}</span>
                </div>
                <div className="d">
                  <span className="title">TSVOIP:</span>
                  <span className="tsvoipNumber">{this.props.tsvoipNumber}</span>
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
      width: 1078px;
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
      background-color: #FFF;
      border: 1px solid #EAEAEA;
    }
    
    .d {
      display: table-cell;
      height: 36px;
      vertical-align: middle;
    }
    
    .table {
      font-size: 14px;
      width: 100%;
      height: 100%;
      background: #EAEAEA;
    }
    
    .row {
      margin-left: 8px;
      margin-right: 6px;
    }
    
    .row:nth-child(1) {
      
      div:nth-child(1) {
        width: 241px;
      }
      
      div:nth-child(2) {
        width: 307px;
      }
      
      div:nth-child(3) {
        width: 508px;
      }
    }
    
    span {
      margin-left: 8px;
    }
    
    .row:nth-child(n+2) > div {
      width: 352px;
    }
    
    span:not(.no) {
      margin-right: 15px;
    }
    
    .information {
      margin-top: 5px;
    }

`;