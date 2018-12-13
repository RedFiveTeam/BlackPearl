import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../page/stores/AdminStore';
import { StyledTimezoneTab } from './tabs/TimezoneTab';
import { AdminActions } from '../../../page/actions/AdminActions';
import { StyledWeatherTab } from './tabs/WeatherTab';
import { StyledGeneralInfoTab } from './tabs/GeneralInfoTab';
import { StyledAcronymTab } from './tabs/AcronymTab';
import { StyledBlameTab } from './tabs/BlameTab';

interface Props {
  className?: string;
  adminStore?: AdminStore;
  adminActions?: AdminActions;
}

@observer
export class AdminCardContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
  }

  async componentDidMount() {
    await this.props.adminActions!.initializeStores();
  }

  changeTab(e: any) {
    Array.from(document.getElementsByClassName('selected')).forEach((el) => {
      el.classList.remove('selected');
    });
    e.target.classList.add('selected');
    this.props.adminStore!.setCurrentTab(e.target.getAttribute('data-tab'));
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="selectors"
        >
          <div data-tab="Time Zones" className="tabSelector selected" onClick={this.changeTab}>Time Zones</div>
          <div data-tab="Weather" className="tabSelector" onClick={this.changeTab}>Weather</div>
          <div data-tab="General Info" className="tabSelector" onClick={this.changeTab}>General Info</div>
          <div data-tab="Acronyms" className="tabSelector" onClick={this.changeTab}>Acronyms</div>
          <div data-tab="Recent Changes" className="tabSelector" onClick={this.changeTab}>Recent Changes</div>
          <button
            className="saveAll"
            onClick={this.props.adminActions!.submitChanges}
          >
            Save
          </button>
        </div>
        <div
          className="tabContent"
        >
          {
            this.props.adminStore!.currentTab === 'Time Zones' &&
            <StyledTimezoneTab/>
          }
          {
            this.props.adminStore!.currentTab === 'Weather' &&
            <StyledWeatherTab/>
          }
          {
            this.props.adminStore!.currentTab === 'General Info' &&
            <StyledGeneralInfoTab/>
          }
          {
            this.props.adminStore!.currentTab === 'Acronyms' &&
            <StyledAcronymTab/>
          }
          {
            this.props.adminStore!.currentTab === 'Recent Changes' &&
            <StyledBlameTab/>
          }
        </div>
      </div>
    );
  }
}

export const StyledAdminCardContainer = inject('adminStore', 'adminActions')(styled(AdminCardContainer)`
width:792px;
height: 361px;
border-radius: 5px;
box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
background-color: #C4C4C4;
font-family: Amaranth;
font-size: 18px;
color: #000000;
display: flex;

position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);

.tabSelector:first-child {
  border-radius: 5px 0px 0px 0px;
}
.tabSelector, button {
  width: 212px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.selected {
  background: #494B4D;
  color: white;
}

.tabContent {
  color: #626262;
  background: #e8e8e8;
  width: 100%;
  border-radius: 0px 5px 5px 0px;
}

.saveAll {
  position: absolute;
  bottom: 0px;
  border-radius: 0px 0px 0px 5px;
  font-family: Amaranth;
  font-size: 18px;
  color: white;
  background-color: #65768B;
  border: none;
}
`);