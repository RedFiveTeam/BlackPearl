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
      weather: [new WeatherModel(
        1,
        'https://www.testingWeather.com'
      )]
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

  it('should get the weather url', () => {
    expect(weatherActions.getWeather).toHaveBeenCalled();
  });

  // it('should render a weather icon', () => {
  //   expect(subject.find(WeatherIcon).exists()).toBeTruthy();
  // });

  it('should have an href with the correct url', () => {
    expect(subject.find('a').at(0).props().href).toBe('https://www.testingWeather.com');
  });
});