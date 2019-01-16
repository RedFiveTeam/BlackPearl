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
    let ele = document.querySelector('.widgetColumn') as HTMLElement;
    ele!.style.maxWidth = '0px';
    ele.style.minWidth = '0px';
    ele!.style.marginRight = '0px';
    let burger = document.querySelector('.bannerBurger') as HTMLElement;
    burger.style.display = 'block';
    burger.style.opacity = '1';
    burger.style.cursor = 'pointer';
  };

  render() {
    return (
      <div className={this.props.className + ' widgetColumn'}>
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
        </div>
      </div>
    );
  }
}

export const StyledWidgetContainer = styled(WidgetContainer)`
background: #1F2226;
max-width: 0;
min-width: 0;
transition: max-width 0.2s ease,min-width 0.2s ease;
top: 0;
width: 0;
 .bannerTitle {
    font-family: "Avenir Next";
    font-size: 30px;
    color: #FBFDFF;
  }
  
  .widgetSection {
    position: fixed;
    width: 354px;

    margin-right: 6px;
  }
     
 .topBar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
    height: 53px;
    align-items: center;
  }
  
    
  #pearlIcon {
    margin-left: 14px;
  }
  
  .widgetBurger {
    cursor: pointer;
    right: 5px;
  }
  
`;