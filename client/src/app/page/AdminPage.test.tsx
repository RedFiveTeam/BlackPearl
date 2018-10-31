import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AdminPage } from './AdminPage';
import { TimezoneModel } from '../utils/time/TimezoneModel';
import { WeatherModel } from '../component/widgets/weather/WeatherModel';

describe('AdminPage', () => {
  let subject: ShallowWrapper;
  let adminStore: any;
  let adminActions: any;

  beforeEach(() => {

    adminStore = {
      timezones: [
        new TimezoneModel(1, 4, '1', '1'),
        new TimezoneModel(2, 5, '2', '2'),
        new TimezoneModel(3, 6, '3', '3')
      ],
      weather: [
        new WeatherModel(1, 'https://www.weather.com', 'USA'),
        new WeatherModel(1, 'https://www.weather2.com', 'CAN'),
        new WeatherModel(1, 'https://www.weather3.com', 'AUS'),
        new WeatherModel(1, 'https://www.weather4.com', 'EUR')
      ],
      setTimezoneZone: jest.fn(),
      setTimezoneName: jest.fn(),
      setWeatherUrl: jest.fn(),
      setWeatherLabel: jest.fn()
    };

    adminActions = {
      submitChanges: jest.fn(),
      initializeStores: jest.fn(),
    };

    subject = shallow(
      <AdminPage
        adminActions={adminActions}
        adminStore={adminStore}
      />
    );
  });

  it('should have a timezone for each zone in the store', () => {
    expect(subject.find('.timezoneRow').length).toBe(adminStore.timezones.length);
  });

  it('should have a label for each time zone', () => {
    expect(subject.find('.timezoneRow').at(0).find('span').text()).toContain('Timezone 4');
    expect(subject.find('.timezoneRow').at(1).find('span').text()).toContain('Timezone 5');
    expect(subject.find('.timezoneRow').at(2).find('span').text()).toContain('Timezone 6');
  });

  it('should have a dropdown for each time zone', () => {
    expect(subject.find('.timezoneRow').at(0).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(1).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(2).find('select').exists()).toBeTruthy();
    expect(subject.find('.timezoneRow').at(0).find('select').prop('value')).toBe(`${adminStore.timezones[0].id}`);
    expect(subject.find('.timezoneRow').at(1).find('select').prop('value')).toBe(`${adminStore.timezones[1].id}`);
    expect(subject.find('.timezoneRow').at(2).find('select').prop('value')).toBe(`${adminStore.timezones[2].id}`);
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
    expect(subject.find('.timezoneRow').at(0).find('input').prop('value')).toBe(`${adminStore.timezones[0].id}`);
    expect(subject.find('.timezoneRow').at(1).find('input').prop('value')).toBe(`${adminStore.timezones[1].id}`);
    expect(subject.find('.timezoneRow').at(2).find('input').prop('value')).toBe(`${adminStore.timezones[2].id}`);
  });

  it('should have a submit button', () => {
    expect(subject.find('button').exists()).toBeTruthy();
    expect(subject.find('button').text()).toBe('Submit');
  });

  it('should submit changes on click', () => {
    subject.find('button').simulate('click');
    expect(adminActions.submitChanges).toHaveBeenCalled();
  });

  it('should hydrate the time store to have current timezones', () => {
    expect(adminActions.initializeStores).toHaveBeenCalled();
  });

  it('should set the new value on dropdown selection', () => {
    subject.find('.timezoneRow').at(0).find('select').simulate('change', {target: {value: 'Zulu'}});
    expect(adminStore.setTimezoneZone).toHaveBeenCalledWith(0, 'Zulu');
  });

  it('should update the timezone friendly zone on text input', () => {
    subject.find('.timezoneRow').at(0).find('input').simulate('change', {target: {value: 'Friendly'}});
    expect(adminStore.setTimezoneName).toHaveBeenCalledWith(0, 'Friendly');
  });

  it('should render 4 weather URL inputs', () => {
    expect(subject.find('.weatherURL').length).toBe(4);
  });

  it('should populate current weather URLs', () => {
    expect(subject.find('.weatherURL').at(0).find('input').props().value).toBe('https://www.weather.com');
    expect(subject.find('.weatherURL').at(1).find('input').props().value).toBe('https://www.weather2.com');
    expect(subject.find('.weatherURL').at(2).find('input').props().value).toBe('https://www.weather3.com');
    expect(subject.find('.weatherURL').at(3).find('input').props().value).toBe('https://www.weather4.com');

  });

  it('should populate current weather labels', () => {
    expect(subject.find('.weatherLabel').at(0).find('input').props().value).toBe('USA');
    expect(subject.find('.weatherLabel').at(1).find('input').props().value).toBe('CAN');
    expect(subject.find('.weatherLabel').at(2).find('input').props().value).toBe('AUS');
    expect(subject.find('.weatherLabel').at(3).find('input').props().value).toBe('EUR');
  });

  it('should update the weather url on text input', () => {
    subject.find('.weatherURL').at(0).simulate('change', {target: {value: 'https://notWeather.com'}});
    expect(adminStore.setWeatherUrl).toHaveBeenCalledWith(0, 'https://notWeather.com');
  });

  it('should update the weather label on text input', () => {
    subject.find('.weatherLabel').at(0).simulate('change', {target: {value: 'NOTUSA'}});
    expect(adminStore.setWeatherLabel).toHaveBeenCalledWith(0, 'NOTUSA');
  });
});