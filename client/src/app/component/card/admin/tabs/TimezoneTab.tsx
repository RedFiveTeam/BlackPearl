import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import moment = require('moment-timezone');

interface Props {
  className?: string;
  adminStore?: AdminStore;
}

@observer
export class TimezoneTab extends React.Component<Props> {
  generateTimezoneRows() {
    const availableTimezones = moment.tz.names();
    return (
      this.props.adminStore!.timezones.map((timezone, index) => {
        return (
          <div className="timezoneRow" key={index}>
            <span>Timezone {timezone.position}</span>
            <input
              value={timezone.name}
              placeholder="Title"
              onChange={(e) => this.props.adminStore!.setTimezoneName(index, e.target.value)}
            />
            <select
              value={timezone.zone}
              onChange={(e) => this.props.adminStore!.setTimezoneZone(index, e.target.value)}
            >
              {
                availableTimezones.map((tz, i) => {
                  return <option value={tz} key={i}>{tz}</option>;
                })
              }
            </select>
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.adminStore!.timezones &&
          this.generateTimezoneRows()
        }
      </div>
    );
  }
}

export const StyledTimezoneTab = inject('adminStore')(styled(TimezoneTab)`
margin-top: 10px;
margin-left: 7px;

.timezoneRow:first-of-type {
  border-top: 1px solid #DFDFDF;
}

.timezoneRow {
  height: 53px;
  width: 560px;
  line-height: 53px;
  border-bottom: 1px solid #DFDFDF;
  white-space: nowrap;
}

span {
  margin-left: 12px;
}

input, select {
  font-size: 18px;
  height: 18px;
  margin-left: 37px;
}

input {
  padding: 0 0 0 0;
  width: 138px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  height: 18px;
  ::placeholder {
    color: #C7C7C7;
  }
}

select {
  width: 242px;
  font-size: 14px;
  border: none;
  background: #FFFFFF;
  margin-top: -10px;
}

`);