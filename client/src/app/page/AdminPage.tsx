import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from './stores/AdminStore';
import { AdminActions } from './actions/AdminActions';
import { InformationModel } from '../component/card/information/InformationModel';
import moment = require('moment-timezone');

interface Props {
  adminStore?: AdminStore;
  adminActions?: AdminActions;
  className?: string;
}

@observer
export class AdminPage extends React.Component<Props> {
  state = {acronym: '', definition: ''};
  
  async componentDidMount() {
    await this.props.adminActions!.initializeStores();
  }

  onAcronymFieldChange = (e: any) => {
    this.setState({acronym: e.target.value});
  };

  onDefinitionFieldChange = (e: any) => {
    this.setState({definition: e.target.value});
  };

  async onAddAcronymButtonClick() {
    await this.props.adminStore!.performLoading(async () => {
      this.props.adminActions!.updatePendingAcronym(this.state.acronym, this.state.definition);
      await this.props.adminActions!.addAcronym();
      this.setState({acronym: '', definition: ''});
    });
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

  generateInformationRows() {
    return (
      <div>
        General Information:<br/>
        <table>
          {
            this.props.adminStore!.information.map((i: InformationModel, index: number) => {
              return (
                <tr className="information" key={index}>
                  <td className="informationName">
                    {i.name}
                  </td>
                  <td>
                    <input
                      className="informationContent"
                      value={i.content}
                      onChange={(e) => this.props.adminStore!.setInformationContent(index, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })
          }
        </table>
      </div>
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
        {
          this.props.adminStore!.information &&
          this.generateInformationRows()
        }
        <div
          className="addAcronym"
        >
          <span>Acronym:</span>
          <input
            value={this.state.acronym}
            className="acronym"
            onChange={(e) => this.onAcronymFieldChange(e)}
          />
          <span>Definition:</span>
          <input
            value={this.state.definition}
            className="acronymDefinition"
            onChange={(e) => this.onDefinitionFieldChange(e)}
          />
          <button
            className="addAcronymButton"
            onClick={async () => {
              await this.onAddAcronymButtonClick();
            }}
          >
            Add
          </button>
        </div>
        <button
          className="saveAll"
          onClick={this.props.adminActions!.submitChanges}
        >
          Save
        </button>
      </div>
    );
  }
}

export const StyledAdminPage = inject('adminStore', 'adminActions')(styled(AdminPage)`
  .weatherURL {
    width: 80%;
  }

  table {
    width: 50%;
  }
  
  .informationName {
    width: 200px;
  }
  
  .informationContent {
    width: 40%;
  }
  
  .information input {
    width: 100%;
  }
  
  .acronymDefinition {
  width: 440px;
  }

`);