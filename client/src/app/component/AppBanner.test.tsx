import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBanner } from './AppBanner';
import { BlackPearlShipIcon } from '../icon/BlackPearlShipIcon';
import { ProfileModel } from '../profile/ProfileModel';

describe('AppBanner', () => {
  let subject: ShallowWrapper;
  let profileStore: any;
  let profileActions: any;

  beforeEach(() => {
    let profile = new ProfileModel();

    profileActions = {
      setProfile: jest.fn()
    };

    profileStore = {
      profile: profile
    };

    subject = shallow(<AppBanner profileStore={profileStore} profileActions={profileActions}/>);
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
});