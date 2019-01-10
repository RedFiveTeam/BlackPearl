import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TimezoneTab } from './TimezoneTab';
import { TimezoneModel } from '../../../widgets/time/TimezoneModel';

describe('TimezoneTab', () => {
  let subject: ShallowWrapper;
  let adminStore: any;

  beforeEach(() => {
    adminStore = {
      pendingTimezones: [
        new TimezoneModel(1, 1, '1', '1'),
        new TimezoneModel(2, 2, '2', '2'),
        new TimezoneModel(3, 3, '3', '3')
      ],
      setPendingTimezoneZone: jest.fn(),
      setPendingTimezoneName: jest.fn(),
    };
    subject = shallow(
      <TimezoneTab
        adminStore={adminStore}
      />
    );
  });

  it('should have a timezone for each zone in the store', () => {
    expect(subject.find('.timezoneRow').length).toBe(adminStore.pendingTimezones.length);
  });

  it('should have a label for each time zone', () => {
    expect(subject.find('.rowTitle').at(0).text()).toContain('Time Zone 1');
    expect(subject.find('.rowTitle').at(1).text()).toContain('Time Zone 2');
    expect(subject.find('.rowTitle').at(2).text()).toContain('Time Zone 3');
  });

  it('should have a dropdown for each time zone', () => {
    expect(subject.find('.timezoneRow').at(0).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(1).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(2).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(0).find('select').prop('value'))
      .toBe(`${adminStore.pendingTimezones[0].id}`);
    expect(subject.find('.timezoneRow').at(1).find('select').prop('value'))
      .toBe(`${adminStore.pendingTimezones[1].id}`);
    expect(subject.find('.timezoneRow').at(2).find('select').prop('value'))
      .toBe(`${adminStore.pendingTimezones[2].id}`);
  });

  it('should have all time zone options for each select', () => {
    expect(subject.find('.timezoneRow').at(0).find('select').find('option').length).toBe(592);
    expect(subject.find('.timezoneRow').at(0).find('select').find('option').at(0).text()).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(0).find('select').find('option').at(0).prop('value')).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(0).find('select').find('option').at(591).text()).toBe('Zulu');
    expect(subject.find('.timezoneRow').at(0).find('select').find('option').at(591).prop('value')).toBe('Zulu');

    expect(subject.find('.timezoneRow').at(1).find('select').find('option').length).toBe(592);
    expect(subject.find('.timezoneRow').at(1).find('select').find('option').at(0).text()).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(1).find('select').find('option').at(0).prop('value')).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(1).find('select').find('option').at(591).text()).toBe('Zulu');
    expect(subject.find('.timezoneRow').at(1).find('select').find('option').at(591).prop('value')).toBe('Zulu');

    expect(subject.find('.timezoneRow').at(2).find('select').find('option').length).toBe(592);
    expect(subject.find('.timezoneRow').at(2).find('select').find('option').at(0).text()).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(2).find('select').find('option').at(0).prop('value')).toBe('Africa/Abidjan');
    expect(subject.find('.timezoneRow').at(2).find('select').find('option').at(591).text()).toBe('Zulu');
    expect(subject.find('.timezoneRow').at(2).find('select').find('option').at(591).prop('value')).toBe('Zulu');
  });

  it('should have a text input for each row', () => {
    expect(subject.find('.timezoneRow').at(0).find('input').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(1).find('input').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(2).find('input').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(0).find('input').prop('value'))
      .toBe(`${adminStore.pendingTimezones[0].id}`);
    expect(subject.find('.timezoneRow').at(1).find('input').prop('value'))
      .toBe(`${adminStore.pendingTimezones[1].id}`);
    expect(subject.find('.timezoneRow').at(2).find('input').prop('value'))
      .toBe(`${adminStore.pendingTimezones[2].id}`);
  });

  it('should set the new value on dropdown selection', () => {
    subject.find('.timezoneRow').at(0).find('select').simulate('change', {target: {value: 'Zulu'}});
    expect(adminStore.setPendingTimezoneZone).toHaveBeenCalledWith(0, 'Zulu');
  });

  it('should update the timezone friendly zone on text input', () => {
    subject.find('.timezoneRow').at(0).find('input').simulate('change', {target: {value: 'Friendly'}});
    expect(adminStore.setPendingTimezoneName).toHaveBeenCalledWith(0, 'Friendly');
  });
});