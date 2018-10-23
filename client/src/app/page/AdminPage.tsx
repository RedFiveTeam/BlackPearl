import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from './AdminStore';
import { AdminActions } from './AdminActions';
import moment = require('moment-timezone');

interface Props {
  adminStore?: AdminStore;
  adminActions?: AdminActions;
  className?: string;
}

@observer
export class AdminPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.adminActions!.initializeTimeStore();
  }

  generateTimezoneRows() {
    const availableTimezones = moment.tz.names();
    return (
      this.props.adminStore!.timezones.map((timezone, index) => {
        return (
          <div className="timezoneRow" key={index}>
            <span>Timezone {timezone.position}</span>
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
            <input
              value={timezone.name}
              onChange={(e) => this.props.adminStore!.setTimezoneName(index, e.target.value)}
            />
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {
          this.props.adminStore!.timezones &&
          this.generateTimezoneRows()
        }
        <button onClick={this.props.adminActions!.submitChanges}>Submit</button>
      </div>
    );
  }
}

export const StyledAdminPage = inject('adminStore', 'adminActions')(styled(AdminPage)``);