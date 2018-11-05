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
            <table className="information">
              <tr>
                  <td>
                    <span className="title no">Image Server:</span>
                    <span className="imageServer">{this.props.imageServer}</span>
                  </td>
                <td colSpan={2}>
                    <span className="title">Call Out Format:</span>
                    <span className="callOutFormat">{this.props.callOutFormat}</span>
                </td>
              </tr>
              <tr>
                  <td>
                    <span className="title no">Image Server (JWICS):</span>
                    <span className="imageServerJWICS">{this.props.imageServerJWICS}</span>
                  </td>
                <td>
                  <span className="title">AUAB:</span>
                  <span className="auabServer">{this.props.auabServer}</span>
                </td>
                <td>
                  <span className="title">NAVCENT:</span>
                  <span className="navcentServer">{this.props.navcentServer}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="title">DSN:</span>
                  <span className="dsnNumber">{this.props.dsnNumber}</span>
                 </td>
                <td>
                  <span className="title">SVOIP:</span>
                  <span className="svoipNumber">{this.props.svoipNumber}</span>
                </td>
                  <td>
                    <span className="title">TSVOIP:</span>
                    <span className="tsvoipNumber">{this.props.tsvoipNumber}</span>
                  </td>
              </tr>
            </table>
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
    
    table, td {
      background-color: #FFF;
      border: 2px solid #EAEAEA;
      border-collapse: collapse;
    }
    
    table {
      font-size: 18px;
      table-layout: fixed;
      width: 100%;
      height: 100%;
    }
    
    span {
      margin-left: 8px;
    }
    
    span:not(.no) {
      margin-right: 15px;
    }
    
    

`;