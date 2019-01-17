import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import moment = require('moment-timezone');
import { AdminActions } from '../../../../page/actions/AdminActions';
import { DropdownIcon } from '../../../../icon/DropdownIcon';

interface Props {
  className?: string;
  adminStore?: AdminStore;
  adminActions?: AdminActions;
}

@observer
export class TimezoneTab extends React.Component<Props> {
  generateTimezoneRows() {
    const availableTimezones = moment.tz.names();
    return (
      this.props.adminStore!.pendingTimezones.map((timezone, index) => {
        return (
          <div className="timezoneRow" key={index}>
            <div
              className="rowTitle"
            >
              Time Zone {timezone.position}
            </div>
            <input
              value={timezone.name}
              placeholder="Title"
              onChange={(e) => this.props.adminStore!.setPendingTimezoneName(index, e.target.value)}
            />
            <select
              value={timezone.zone}
              onChange={(e) => this.props.adminStore!.setPendingTimezoneZone(index, e.target.value)}
            >
              {
                availableTimezones.map((tz, i) => {
                  return <option value={tz} key={i}>{tz}</option>;
                })
              }
            </select>
            <DropdownIcon/>
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
          this.props.adminStore!.pendingTimezones &&
          this.generateTimezoneRows()
        }
        {this.props.children}
      </div>
    );
  }
}

export const StyledTimezoneTab = inject('adminStore', 'adminActions')(styled(TimezoneTab)`
margin-top: 35px;
margin-left: 7px;

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 20px;
  right: 3.5%;
}

.cancelButton {
  width: 94px;
  height: 36px;
  background: none;
  border: none;
  color: #76ADED;
}

.saveButton {
  width: 94px;
  height: 36px;
  background: linear-gradient(180deg, #679CF6 0%, #4072EE 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border: none;
  color: #FFFFFF;
  margin-right: 5%;
}

.timezoneRow {
  height: 94px;
  width: 96%;
  line-height: 53px;
  white-space: nowrap;
  display: flex;
  justify-items: center;
  position: relative;
}

.rowTitle {
  width: 20%;
  text-align: center;
}

input, select {
  font-size: 18px;
  height: 36px;
  margin-left: 60px;
  color: #FFFFFF;
}

input {
  padding: 0 0 0 0;
  width: 20%;
  border: none;
  background: none;
  border-bottom: 1px solid #93A7C3;
  font-size: 18px;
  ::placeholder {
    color: #93A7C3;
    font-size: 14px;
  }
}

select {
  width: 55%;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #93A7C3;
  -webkit-appearance: none;
  background: none;
  border-radius: 0;
}

select option {
  background-color: grey;
}

svg {
  position: relative;
  right: 15px;
  top: 20px;
  width: 10px;
  height: 5px;
}

svg > path {
  fill: #93A7C3;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
  .dropIcon {
    display: none;
  }
}
`);