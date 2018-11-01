import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from './stores/AdminStore';
import { AdminActions } from './actions/AdminActions';
import moment = require('moment-timezone');

interface Props {
  adminStore?: AdminStore;
  adminActions?: AdminActions;
  className?: string;
}

@observer
export class AdminPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.adminActions!.initializeStores();
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
        <div className="weather">
          <span>Weather URLs:</span>
          {
            this.props.adminStore!.weather &&
            this.props.adminStore!.weather.map((w, index) => {
              return (
                <div
                  key={index}
                >
                  <input
                    value={w.label}
                    className="weatherLabel"
                    onChange={(e) => this.props.adminStore!.setWeatherLabel(index, e.target.value)}
                  />
                  <input
                    value={w.url}
                    className="weatherURL"
                    onChange={(e) => this.props.adminStore!.setWeatherUrl(index, e.target.value)}
                  />
                </div>
              );
            })
          }
        </div>
        <button onClick={this.props.adminActions!.submitChanges}>Submit</button>
      </div>
    );
  }
}

export const StyledAdminPage = inject('adminStore', 'adminActions')(styled(AdminPage)`
  .weatherURL {
    width: 80%;
  }
`);