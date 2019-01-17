import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { BlameModel } from '../../../resource/blame/BlameModel';
import { AdminActions } from '../../../../page/actions/AdminActions';

const moment = require('moment-timezone');

interface Props {
  className?: string;
  adminStore?: AdminStore;
  adminActions?: AdminActions;
}

@observer
export class BlameTab extends React.Component<Props> {

  async componentDidMount() {
    await this.props.adminActions!.initializeStores();
  }

  parseName(name: string) {
    if (name === 'GUEST.GUEST.GUEST.0123456789' || name === 'anonymousUser') {
      return 'Guest';
    }
    const nameArray = name.split('.');
    const last = nameArray[0].charAt(0) + nameArray[0].substr(1).toLowerCase();
    const first = nameArray[1] ?
      ', ' + nameArray[1].charAt(0) + nameArray[1].substr(1).toLowerCase() :
      '';
    return last + first;
  }

  parseAction(action: string) {
    switch (action) {
      case 'DELETE':
        return 'Deleted resource: ';
      case 'EDIT':
        return 'Edited resource: ';
      case 'ADD':
        return 'Added resource: ';
      case 'ADD_OP':
        return 'Added operation: ';
      case 'EDIT_OP':
        return 'Edited operation: ';
      case 'DELETE_OP':
        return 'Deleted operation: ';
      case 'ADD_ACRONYM':
        return 'Added acronym: ';
      case 'DELETE_ACRONYM':
        return 'Deleted acronym: ';
      default:
        return 'Unknown action: ';
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="recentChangesTitle">Recent Changes</div>
        <table cellSpacing="0">
          <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Activity</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.adminStore!.blames ? this.props.adminStore!.blames.map((b: BlameModel, index) => {
              return (
                <tr
                  key={index}
                >
                  <td>{moment.unix(b.time).format('DD MMMM YYYY @HHmm') + 'L'}</td>
                  <td>{this.parseName(b.user)}</td>
                  <td>{this.parseAction(b.action)}<strong>{b.name}</strong></td>
                </tr>
              );
            }) : ''
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export const StyledBlameTab = inject('adminStore', 'adminActions')(styled(BlameTab)`
    .recentChangesTitle {
        text-align: center;
        color: #FFFFFF;
        font-size: 24px;
        margin-top: 15px;
        margin-bottom: 37px;
    }

    table {
        width: 95%;
        height: 500px;
        margin: auto;
        background: #292E33;
        border-radius: 4px;
        table-layout: fixed;

        thead {
            color: #93A7C3;
            width: 100%;
            display: table;
            border-radius: 4px 4px 0 0;
            background: #000000;
            height: 40px;
    
        th {
            text-align: left;
            border-spacing: 0;
            border-collapse: collapse;
        }
    
        th:nth-of-type(1) {
          width: 22%;
          padding-left: 3%;
        }
        
        th:nth-of-type(2) {
          width: 20%;
        }
    
        th:nth-of-type(3) {
          width: 50%;
        }
    
        }
    
    
        tbody {
            background: #292E33;
            width: 100%;
            display: block;
            overflow-y: auto;
            max-height: 460px;
            margin: auto;
    
            tr {
                line-height: 64px;
                display: table;
                width: 94%;
                table-layout: fixed;
                margin: auto;
                height: 64px;
                td {
                    border-bottom: 1px solid #38404B;
                    overflow: hidden;
                    white-space: nowrap; 
                    text-overflow: ellipsis;
                }
                
                td:nth-of-type(1) {
                  width: 22%;
                }
                td:nth-of-type(2) {
                  width: 23%
                }
                td:nth-of-type(3) {
                  width: 54%;
                }
                
            }
        }
    }

`);