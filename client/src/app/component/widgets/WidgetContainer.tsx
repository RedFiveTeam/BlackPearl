import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { PearlIcon } from '../../icon/PearlIcon';
import { StyledAcronymContainer } from './acronym/AcronymContainer';
import { StyledCoordinateConverterContainer } from './coordinateConverter/CoordinateConverterContainer';
import { StyledWeatherContainer } from './weather/WeatherContainer';
import { StyledHamburgerButton } from '../button/HamburgerButton';
import { StyledMeasurementConverterContainer } from './measurementConverter/MeasurementConverterContainer';
import { ProfileActions } from '../../profile/ProfileActions';

interface Props {
  className?: string;
  profileActions?: ProfileActions;
  visible: number;
}

@observer
export class WidgetContainer extends React.Component<Props> {
  async componentDidMount() {
    this.toggleWidgets(this.props.visible);
  }

  componentWillReceiveProps(nextProps: Readonly<Props>): void {
    this.toggleWidgets(nextProps.visible);
  }

  toggleWidgets(visible: number) {
    let ele = document.querySelector('.widgetColumn') as HTMLElement;
    let cardContainer = document.querySelector('.cardContainer');
    if (cardContainer !== null) {
      if (visible) {
        (cardContainer as HTMLElement).style.width = 'calc(99.1vw - 354px)';
      } else {
        (cardContainer as HTMLElement).style.width = '99.1vw';
      }
    }

    if (ele) {
      if (visible) {
        ele.style.maxWidth = '354px';
        ele.style.minWidth = '354px';
        ele.style.marginRight = '5px';
      } else {
        ele.style.maxWidth = '0px';
        ele.style.minWidth = '0px';
        ele.style.marginRight = '0px';
      }
    }
  }

  render() {
    return (
      <div className={this.props.className + ' widgetColumn expandedWidgetColumn'}>
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
              onClick={async () => {
                await this.props.profileActions!.toggleWidgetsVisible();
              }}
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

export const StyledWidgetContainer = inject('profileStore', 'profileActions')(styled(WidgetContainer)`
transition: max-width 0.2s ease,min-width 0.2s ease;
top: 0px;
max-width: 0px;
min-width: 0px;
margin-right: 0px;

 .bannerTitle {
    font-family: "Avenir Next";
    font-size: 30px;
    color: #FBFDFF;
  }
  
  .widgetSection {
    position: fixed;
    width: 354px;
    margin-right: 6px;
    background: #1F2226;
    height: 100%;
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
    right: 15px;
  }
  
`);
