import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AdminCardContainer } from './AdminCardContainer';
import { StyledTimezoneTab } from './tabs/TimezoneTab';
import { StyledWeatherTab } from './tabs/WeatherTab';
import { StyledGeneralInfoTab } from './tabs/GeneralInfoTab';
import { StyledAcronymTab } from './tabs/AcronymTab';
import { StyledBlameTab } from './tabs/BlameTab';
import { ClockIcon } from '../../../icon/ClockIcon';
import { CloudIcon } from '../../../icon/CloudIcon';
import { InfoIcon } from '../../../icon/InfoIcon';
import { ABCIcon } from '../../../icon/ABCIcon';
import { AuditIcon } from '../../../icon/AuditIcon';

describe('AdminCardContainer', () => {
  let subject: ShallowWrapper;
  let adminStore: any;
  let adminActions: any;

  beforeEach(() => {
    adminStore = {
      setCurrentTab: jest.fn(),
      currentTab: 'Time Zones'
    };

    adminActions = {
      initializeStores: jest.fn(),
      submitChanges: jest.fn(),
      setCurrentTab: jest.fn(),
      resetTab: jest.fn()
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
    expect(subject.find('.tabSelector').at(0).find(InfoIcon).exists()).toBeTruthy();
    expect(subject.find('.tabSelector').at(1).find(ClockIcon).exists()).toBeTruthy();
    expect(subject.find('.tabSelector').at(2).find(ABCIcon).exists()).toBeTruthy();
    expect(subject.find('.tabSelector').at(3).find(CloudIcon).exists()).toBeTruthy();
    expect(subject.find('.tabSelector').at(4).find(AuditIcon).exists()).toBeTruthy();
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
    subject.find('.tabSelector').at(3).simulate('click', {
      target: {
        getAttribute: () => {
          return 'Weather';
        },
        classList: {
          add: jest.fn()
        }
      }
    });
    expect(adminStore.setCurrentTab).toHaveBeenCalledWith('Weather');
  });

  it('should change the tab based on the adminStore', () => {
    adminStore.currentTab = 'Weather';
    subject.instance().forceUpdate();
    expect(subject.find(StyledWeatherTab).exists()).toBeTruthy();
    adminStore.currentTab = 'Time Zones';
    subject.instance().forceUpdate();
    expect(subject.find(StyledTimezoneTab).exists()).toBeTruthy();
    adminStore.currentTab = 'General Info';
    subject.instance().forceUpdate();
    expect(subject.find(StyledGeneralInfoTab).exists()).toBeTruthy();
    adminStore.currentTab = 'Acronyms';
    subject.instance().forceUpdate();
    expect(subject.find(StyledAcronymTab).exists()).toBeTruthy();
    adminStore.currentTab = 'Audit';
    subject.instance().forceUpdate();
    expect(subject.find(StyledBlameTab).exists()).toBeTruthy();
  });
});