import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { WidgetContainer } from './WidgetContainer';
import { StyledAcronymContainer } from './acronym/AcronymContainer';
import { StyledWeatherContainer } from './weather/WeatherContainer';
import { StyledCoordinateConverterContainer } from './coordinateConverter/CoordinateConverterContainer';
import { PearlIcon } from '../../icon/PearlIcon';

describe('WidgetContainer', () => {
  let subject: ShallowWrapper;
  let profileActions: any;

  beforeEach(() => {

    profileActions = {
      setProfile: jest.fn()
    };

    subject = shallow(
      <WidgetContainer
        visible={1}
        profileActions={profileActions}
      />
    );
  });

  it('should have an acronym container', () => {
    expect(subject.find(StyledAcronymContainer).exists()).toBeTruthy();
  });

  it('should have a weather container', () => {
    expect(subject.find(StyledWeatherContainer).exists()).toBeTruthy();
  });

  it('should have a Coordinate Converter', () => {
    expect(subject.find(StyledCoordinateConverterContainer).exists()).toBeTruthy();
  });

  it('should have text "The Black Pearl" and an icon', () => {
    expect(subject.find('.bannerTitle').text()).toBe('The Black Pearl');
    expect(subject.find(PearlIcon).exists()).toBeTruthy();
  });
});