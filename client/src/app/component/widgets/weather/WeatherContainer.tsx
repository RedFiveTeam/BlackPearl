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
        <WeatherIcon/>
        {
          this.props.weatherStore!.weather.map((w, index) => {
            return (
              <a
                target="__blank"
                key={index}
                className={'weatherURL weather' + index}
                href={w.url}
              >
                <span key={index} className="weatherLabel">{w.label}</span>
              </a>
            );
          })
        }
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
font-family: Amaranth;
font-size: 24px;
color: #FFFFFF;
box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
position: relative;
display: flex;

  svg {
    position: absolute;
    align-self: center;
    left: 71px;
  }
  
  .weatherURL {
    width: 175px;
    height: 118px;
    line-height: 118px;
    position: absolute;
    font-family: Amaranth;
    font-size: 48px;
    color: #CFCECE;
    font-weight: 800;
    text-decoration: none;
  }
  
  .weatherLabel {
    text-shadow: rgba(0,0,0,0.3) -1px 4px 12px;
  }
  
  .weather0 {
    border-right: solid #959595 5px;
    border-bottom: solid #959595 5px;
  }
  
  .weather1 {
    left: 50%;
    border-bottom: solid #959595 5px;
  }
  
  .weather2 {
    top: 51%;
    border-right: solid #959595 5px;
  }
  
  .weather3 {
    top: 51%;
    left: 50%;
  }

`);