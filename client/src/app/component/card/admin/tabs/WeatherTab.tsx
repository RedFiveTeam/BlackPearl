import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';

interface Props {
  className?: string;
  adminStore?: AdminStore;
}

@observer
export class WeatherTab extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="weather">
          {
            this.props.adminStore!.pendingWeather &&
            this.props.adminStore!.pendingWeather.map((w, index) => {
              return (
                <div
                  key={index}
                  className="weatherRow"
                >
                  <div
                    className="weatherTitle"
                  >
                  Location {index + 1}
                  </div>
                  <input
                    value={w.label}
                    className="weatherLabel"
                    placeholder="Location"
                    onChange={(e) => this.props.adminStore!.setPendingWeatherLabel(index, e.target.value)}
                  />
                  <input
                    value={w.url}
                    className="weatherURL"
                    placeholder="URL"
                    onChange={(e) => this.props.adminStore!.setPendingWeatherUrl(index, e.target.value)}
                  />
                </div>
              );
            })
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}

export const StyledWeatherTab = inject('adminStore')(styled(WeatherTab)`
margin-top: 30px;

.weatherRow {
  height: 90px;
  width: 95%;
  line-height: 34px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

input {
  border: none;
  font-size: 18px;
  height: 36px;
  background: none;
  color: #FFFFFF;
  border-bottom: 1px solid #93A7C3;
  ::placeholder {
    color: #93A7C3;
    font-size: 14px;
  }
}

.weatherTitle {
  width: 20%;
  padding-left: 90px;
}

.weatherLabel {
  width: 20%;
}

.weatherURL {
  margin-left: 60px;
  width: 55%;
}

`);