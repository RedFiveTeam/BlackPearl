import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { WeatherStore } from './WeatherStore';
import { WeatherActions } from './actions/WeatherActions';
import { MetricActions } from '../../metrics/metric/MetricActions';
import { LogableActions } from '../../metrics/metric/MetricModel';

interface Props {
  className?: string;
  weatherStore?: WeatherStore;
  weatherActions?: WeatherActions;
  metricActions?: MetricActions;
}

@observer
export class WeatherContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.weatherActions!.getWeather();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="title"
        >
          Weather
        </div>
        {
          this.props.weatherStore!.weather.map((w, index) => {
            return (
              <a
                target="__blank"
                key={index}
                className={'weatherURL weather' + index}
                onClick={async () => {
                  await this.props.metricActions!.logMetric(LogableActions.CLICK_WEATHER, w.label);
                }}
                href={w.url}
              >
                <div key={index} className="weatherLabel">{w.label}</div>
              </a>
            );
          })
        }
      </div>
    );
  }
}

export const StyledWeatherContainer = inject('weatherStore', 'weatherActions', 'metricActions')
(styled(WeatherContainer)`
width: 340px;
height: 141px;
background: #292E33;
color: #FFFFFF;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
border-radius: 4px;
display: flex;
flex-wrap: wrap;
margin-left: 7px;
margin-top: 8px;
justify-content: space-evenly;

a {
  height: 40px;
}

.title {
  font-size: 24px;
  text-align: center;
  line-height: 24px;
  height: 24px;
  width: 100%;
  padding-top: 8px;
}

.weatherURL {
  text-decoration: none;
}

.weatherLabel {
  width: 158px;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  color: #FFFFFF;
  background: rgba(141, 141, 141, 0.5);
  border-radius: 4px;
  box-shadow: -1px 3px 3px rgba(0, 0, 0, .4);
}

`);