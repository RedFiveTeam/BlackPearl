import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AdminCardContainer } from './AdminCardContainer';
import { StyledTimezoneTab } from './tabs/TimezoneTab';
import { StyledWeatherTab } from './tabs/WeatherTab';
import { StyledGeneralInfoTab } from './tabs/GeneralInfoTab';
import { StyledAcronymTab } from './tabs/AcronymTab';
import { AdminStore } from '../../../page/stores/AdminStore';
import { StyledBlameTab } from './tabs/BlameTab';

describe('AdminCardContainer', () => {
  let subject: ShallowWrapper;
  let adminStore: AdminStore;
  let adminActions: any;

  beforeEach(() => {
    adminStore = new AdminStore();
    adminStore.setCurrentTab('Time Zones');

    adminActions = {
      initializeStores: jest.fn(),
      submitChanges: jest.fn()
    };

    subject = shallow(
      <AdminCardContainer
        adminStore={adminStore}
        adminActions={adminActions}
      />
    );
  });

  it('should contain a button for each tab', () => {
    expect(subject.find('.selectors').exists()).toBeTruthy();
    expect(subject.find('.tabSelector').length).toBe(5);
  });

  it('should contain an area to render the tab contents', () => {
    expect(subject.find('.tabContent').exists()).toBeTruthy();
  });

  it('should show the time zones tab by default', () => {
    expect(subject.find(StyledTimezoneTab).exists()).toBeTruthy();
  });

  it('should hydrate the time store to have current timezones', () => {
    expect(adminActions.initializeStores).toHaveBeenCalled();
  });

  it('should change the tab when tabSelector is clicked', () => {
    subject.find('.tabSelector').at(1).simulate('click', {
      target: {
        getAttribute: () => {
          return 'Weather';
        },
        classList: {
          add: jest.fn()
        }
      }
    });
    expect(subject.find(StyledWeatherTab).exists()).toBeTruthy();
  });

  it('should change the tab based on the adminStore', () => {
    adminStore.setCurrentTab('Time Zones');
    expect(subject.find(StyledTimezoneTab).exists()).toBeTruthy();
    adminStore.setCurrentTab('Weather');
    expect(subject.find(StyledWeatherTab).exists()).toBeTruthy();
    adminStore.setCurrentTab('General Info');
    expect(subject.find(StyledGeneralInfoTab).exists()).toBeTruthy();
    adminStore.setCurrentTab('Acronyms');
    expect(subject.find(StyledAcronymTab).exists()).toBeTruthy();
    adminStore.setCurrentTab('Recent Changes');
    expect(subject.find(StyledBlameTab).exists()).toBeTruthy();
  });

  it('should have a save button', () => {
    expect(subject.find('.saveAll').exists()).toBeTruthy();
    expect(subject.find('.saveAll').text()).toBe('Save');
  });

  it('should submit changes on click', () => {
    subject.find('.saveAll').simulate('click');
    expect(adminActions.submitChanges).toHaveBeenCalled();
  });

});