import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { PearlIcon } from '../../icon/PearlIcon';
import { StyledAcronymContainer } from './acronym/AcronymContainer';
import { StyledCoordinateConverterContainer } from './coordinateConverter/CoordinateConverterContainer';
import { StyledWeatherContainer } from './weather/WeatherContainer';
import { StyledHamburgerButton } from '../button/HamburgerButton';
import { StyledMeasurementConverterContainer } from './measurementConverter/MeasurementConverterContainer';

interface Props {
  className?: string;
}

@observer
export class WidgetContainer extends React.Component<Props> {

  toggleMenu = () => {
    let ele = document.querySelector('.widgetSection') as HTMLElement;
    ele!.style.width = '0px';
    let burger = document.querySelector('.bannerBurger') as HTMLElement;
    burger.style.display = 'block';
    burger.style.opacity = '1';
    burger.style.cursor = 'pointer';
  };

  render() {
    return (
      <div>
        <div
          className="widgetSection"
        >
          <div className="topBar">
            <PearlIcon/>
            <div className="bannerTitle">
              The Black Pearl
            </div>
            <StyledHamburgerButton
              className="widgetBurger"
              onClick={this.toggleMenu}
            />
          </div>
          <StyledAcronymContainer/>
          <StyledCoordinateConverterContainer/>
          <StyledMeasurementConverterContainer/>
          <StyledWeatherContainer/>
          <div className="widgetBackground"/>
        </div>
      </div>
    );
  }
}

export const StyledWidgetContainer = styled(WidgetContainer)`
`;