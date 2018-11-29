import * as React from 'react';
import { WeatherContainer } from './WeatherContainer';
import { shallow } from 'enzyme';
import { WeatherModel } from './WeatherModel';

describe('WeatherContainer', () => {
  let subject: any;
  let weatherStore: any;
  let weatherActions: any;

  beforeEach(() => {
    weatherStore = {
      weather: [
        new WeatherModel(1, 'https://www.testingWeather.com', 'USA'),
        new WeatherModel(2, 'https://www.weather2.com', 'CAN'),
        new WeatherModel(3, 'https://www.weather3.com', 'AUS'),
        new WeatherModel(4, 'https://www.weather4.com', 'EUR'),
      ]
    };

    weatherActions = {
      getWeather: jest.fn()
    };

    subject = shallow(
      <WeatherContainer
        weatherStore={weatherStore}
        weatherActions={weatherActions}
      />
    );
  });

  it('should get the weather data', () => {
    expect(weatherActions.getWeather).toHaveBeenCalled();
  });

  it('should have an href with the correct url', () => {
    expect(subject.find('.weatherURL').at(0).props().href).toBe('https://www.testingWeather.com');
    expect(subject.find('.weatherLabel').at(0).text()).toBe('USA');
  });

  it('should render four weather components', () => {
    expect(subject.find('.weatherURL').length).toBe(4);
  });
});