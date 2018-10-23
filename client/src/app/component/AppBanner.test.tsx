import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBanner } from './AppBanner';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';
import { StyledTimeContainer } from './widgets/TimeContainer';

describe('AppBanner', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<AppBanner/>);
  });

  it('should have text "The Black Pearl"', () => {
    expect(subject.find('.bannerTitle').text()).toBe('The Black Pearl');
  });

  it('should have a Black Pearl icon', () => {
    expect(subject.find(BlackPearlShipIcon).exists()).toBeTruthy();
  });

  it('should display an information banner', () => {
    expect(subject.find('.informationBanner').exists()).toBeTruthy();
  });

  it('should display a time container', () => {
    expect(subject.find(StyledTimeContainer).exists()).toBeTruthy();
  });
});