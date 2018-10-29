import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { WeatherStore } from './WeatherStore';
import { WeatherActions } from './WeatherActions';
import { WeatherIcon } from '../../../icon/WeatherIcon';

interface Props {
  className?: string;
  weatherStore?: WeatherStore;
  weatherActions?: WeatherActions;
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
        <div className="title">
          Weather
        </div>
        <div className="weather">
          {
            this.props.weatherStore!.weather[0] &&
            <a target="__blank" href={this.props.weatherStore!.weather[0].url}>
                <WeatherIcon/>
            </a>
          }
        </div>
      </div>
    );
  }
}

export const StyledWeatherContainer = inject('weatherStore', 'weatherActions')(styled(WeatherContainer)`
width: 350px;
height: 241px;
background: #364958;
border-radius: 10px;
margin-top: 8px;
margin-left: 8px;
text-align: center;
font-family: "Alegreya Sans";
font-size: 24px;
color: #FFFFFF;
box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);

  .title {
    padding-top: 5px;
  }
  
  svg {
    margin-top: 20px;
  }
`);