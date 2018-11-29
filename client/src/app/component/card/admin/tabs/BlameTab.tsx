import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { BlameModel } from '../../../resource/blame/BlameModel';
import { ClockIcon } from '../../../../icon/ClockIcon';

const moment = require('moment-timezone');

interface Props {
  className?: string;
  adminStore?: AdminStore;
}

@observer
export class BlameTab extends React.Component<Props> {

  parseName(name: string) {
    if (name === 'GUEST.GUEST.GUEST.0123456789') {
      return 'Guest';
    }
    const nameArray = name.split('.');
    const last = nameArray[0].charAt(0) + nameArray[0].substr(1).toLowerCase();
    const first = nameArray[1] ?
      ', ' + nameArray[1].charAt(0) + nameArray[1].substr(1).toLowerCase() :
      '';
    return last + first;
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="recentChangesTitle">Recent Resource Changes</div>
        <div
          className="recentChangesList"
        >
          {
            this.props.adminStore!.blames.map((b: BlameModel, index: number) => {
              return (
                <div
                  key={index}
                  className="blameLine"
                >
                  <div
                    className="timeLine"
                  >
                    <ClockIcon/><span>{moment.unix(b.time).format('D MMM YY HHmm')}L</span>
                  </div>
                  <div
                    className="actionLine"
                  >
                    <span>{b.name}</span> was {b.action.toLowerCase() + (b.action === 'DELETE' ? 'd ' : 'ed ')}
                    by {this.parseName(b.user)}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledBlameTab = inject('adminStore')(styled(BlameTab)`

.recentChangesTitle {
  text-align: center;
  color: #000000;
  margin-top: 8px;
  margin-bottom: 29px;
}

.recentChangesList {
  overflow: auto;
  height: 277px;
  background: #FFFFFF;
  border: 5px solid #FFFFFF;
  width: 547px;
  border-radius: 2px;
  margin: auto;
}

.blameLine {
  margin-left: 5px;
  border-bottom: 1px solid #C7C7C7;
}

.timeLine {
  margin-top: 10px;
  font-size: 14px;
  line-height: 16px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  color: #494B4D;
  svg {
    margin-right: 6px;
  }
  
}

.actionLine  {
  margin-bottom: 13px;
  margin-top: 3px;
  height: 22px;
  line-height: 22px;
  color: #000000;
  white-space: nowrap;
  span {
    font-weight: bold;
  }
}
`);