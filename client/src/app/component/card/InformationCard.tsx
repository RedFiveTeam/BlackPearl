import { observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
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
                  <td><span className="no">Image Server:</span> earth.gvs.nga.smil.mil</td>
                <td colSpan={2}>
                    <span>Call Out Format:</span>
                    | Number | Age | Gender | Clothing | Activity | From | To |
                </td>
              </tr>
              <tr>
                  <td><span className="no">Image Server (JWICS):</span> earth.gvs.nga.ic.gov</td>
                <td><span>AUAB:</span></td>
                <td><span>NAVCENT:</span></td>
              </tr>
              <tr>
                <td><span>DSN:</span> 575-1410</td>
                <td><span>SVOIP:</span> 302-574-0375(0376)</td>
                  <td><span>TSVOIP:</span> 984-4971</td>
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
    bottom: 170px;
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
      font-weight: bold;
      color: #000;
    }
    
    span:not(.no) {
      margin-right: 15px;
    }
    
    

`;