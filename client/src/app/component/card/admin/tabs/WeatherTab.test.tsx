import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { WeatherTab } from './WeatherTab';
import { WeatherModel } from '../../../widgets/weather/WeatherModel';

describe('WeatherTab', () => {
  let subject: ShallowWrapper;
  let adminStore: any;

  beforeEach(() => {
    adminStore = {
      pendingWeather: [
        new WeatherModel(1, 'https://www.weather.com', 'USA'),
        new WeatherModel(1, 'https://www.weather2.com', 'CAN'),
        new WeatherModel(1, 'https://www.weather3.com', 'AUS'),
        new WeatherModel(1, 'https://www.weather4.com', 'EUR')
      ],
      setPendingWeatherUrl: jest.fn(),
      setPendingWeatherLabel: jest.fn(),
    };
    subject = shallow(
      <WeatherTab
        adminStore={adminStore}
      />
    );
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
    expect(adminStore.setPendingWeatherUrl).toHaveBeenCalledWith(0, 'https://notWeather.com');
  });

  it('should update the weather label on text input', () => {
    subject.find('.weatherLabel').at(0).simulate('change', {target: {value: 'NOTUSA'}});
    expect(adminStore.setPendingWeatherLabel).toHaveBeenCalledWith(0, 'NOTUSA');
  });

});