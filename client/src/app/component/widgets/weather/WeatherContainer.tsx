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
                onClick={() => { this.props.metricActions!.logMetric(LogableActions.CLICK_WEATHER, w.label); }}
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
width: 350px;
height: 141px;
background: #364958;
font-family: Amaranth;
color: #FFFFFF;
box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
border-radius: 10px;
display: flex;
flex-wrap: wrap;
margin-left: 8px;
margin-top: 10px;
justify-content: space-evenly;

a {
  height: 40px;
}

.title {
  font-family: Amaranth;
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
  font-family: Amaranth;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  color: #FFFFFF;
  background: rgba(141, 141, 141, 0.5);
  border-radius: 10px;
  box-shadow: -1px 3px 3px rgba(0, 0, 0, .4);
}

`);