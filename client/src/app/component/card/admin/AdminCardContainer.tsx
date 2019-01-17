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
import { ClockIcon } from '../../../icon/ClockIcon';
import { CloudIcon } from '../../../icon/CloudIcon';
import { InfoIcon } from '../../../icon/InfoIcon';
import { ABCIcon } from '../../../icon/ABCIcon';
import { AuditIcon } from '../../../icon/AuditIcon';
import { action } from 'mobx';

interface Props {
  className?: string;
  adminStore?: AdminStore;
  adminActions?: AdminActions;
}

@observer
export class AdminCardContainer extends React.Component<Props> {

  async componentDidMount() {
    this.props.adminStore!.setCurrentTab('General Info');
    await this.props.adminActions!.initializeStores();
  }

  @action.bound
  changeTab(e: any) {
    this.props.adminActions!.resetTab();
    let selected = document.getElementsByClassName('selected');
    for (let i = 0; i < selected.length; i++) {
      selected.item(i)!.classList.remove('selected');
    }
    e.target.classList.add('selected');
    this.props.adminStore!.setCurrentTab(e.target.getAttribute('data-tab'));
  }

  tabActionButtons() {
    return (
      <div
        className="buttonContainer"
      >
        <button className="cancelButton" onClick={this.props.adminActions!.resetTab}>CANCEL</button>
        <button className="saveButton" onClick={this.props.adminActions!.submitChanges}>SAVE</button>
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="selectors"
        >

          <div data-tab="General Info" className="tabSelector selected" onClick={this.changeTab}>
            <InfoIcon/>General Info
          </div>
          <div data-tab="Time Zones" className="tabSelector" onClick={this.changeTab}>
            <ClockIcon/>Time Zones
          </div>
          <div data-tab="Acronyms" className="tabSelector" onClick={this.changeTab}>
            <ABCIcon/>Acronyms
          </div>
          <div data-tab="Weather" className="tabSelector" onClick={this.changeTab}>
            <CloudIcon/>Weather
          </div>
          <div data-tab="Audit" className="tabSelector" onClick={this.changeTab}>
            <AuditIcon/>Audit
          </div>
        </div>
        <div
          className="tabContent"
        >
          {
            this.props.adminStore!.currentTab === 'Time Zones' &&
            <StyledTimezoneTab>
              {this.tabActionButtons()}
            </StyledTimezoneTab>
          }
          {
            this.props.adminStore!.currentTab === 'Weather' &&
            <StyledWeatherTab>
              {this.tabActionButtons()}
            </StyledWeatherTab>
          }
          {
            this.props.adminStore!.currentTab === 'General Info' &&
            <StyledGeneralInfoTab>
              {this.tabActionButtons()}
            </StyledGeneralInfoTab>
          }
          {
            this.props.adminStore!.currentTab === 'Acronyms' &&
            <StyledAcronymTab/>
          }
          {
            this.props.adminStore!.currentTab === 'Audit' &&
            <StyledBlameTab/>
          }
        </div>
      </div>
    );
  }
}

export const StyledAdminCardContainer = inject('adminStore', 'adminActions')(styled(AdminCardContainer)`
width:90%;
min-width: 1503px;
height: 652px;
border-radius: 5px;
box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
background-color: #1F2226;
font-size: 18px;
color: #93A7C3;
display: flex;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);

.selectors {
  padding-top: 29px;
  width: 5%;
  min-width: 328px;
  border-right: 1px solid #475364;
}

.tabSelector {
  width: 85%;
  height: 67px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  svg {
    pointer-events: none;
    margin-left: 34px;
    margin-right: 25px;
    width: 41px;
  }
}

.selected {
  background: linear-gradient(to bottom, #679CF6, #4072EE);
  color: #FFFFFF;
  border-radius: 0 6px 6px 0;
  svg > path {
    fill: #FFFFFF;
  }
}

.tabContent {
  color: #FFFFFF;
  background: #1F2226;
  width: 95%;
  border-radius: 0px 5px 5px 0px;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 20px;
  right: 3.5%;
}

.cancelButton {
  width: 94px;
  height: 36px;
  background: none;
  border: none;
  color: #76ADED;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.saveButton {
  width: 94px;
  height: 36px;
  background: linear-gradient(180deg, #679CF6 0%, #4072EE 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border: none;
  color: #FFFFFF;
  margin-right: 5%;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}
`);