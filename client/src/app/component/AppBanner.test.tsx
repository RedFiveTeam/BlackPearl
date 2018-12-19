import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBanner } from './AppBanner';
import { StyledATODay } from './widgets/time/ATODay';
import { ATODayBorderIcon } from '../icon/ATODayBorderIcon';
import { StyledTimeContainer } from './widgets/time/TimeContainer';
import { StyledProfileContainer } from '../profile/ProfileContainer';

describe('AppBanner', () => {
  let subject: ShallowWrapper;
  let profileActions: any;

  beforeEach(() => {
    profileActions = {
      setProfile: jest.fn()
    };

    subject = shallow(<AppBanner profileActions={profileActions}/>);
  });

  it('should render an ATO date', () => {
    expect(subject.find(StyledATODay).exists()).toBeTruthy();
  });

  it('should have a border next to the ATO date', () => {
    expect(subject.find(ATODayBorderIcon).exists()).toBeTruthy();
  });

  it('should have the time container', () => {
    expect(subject.find(StyledTimeContainer).exists()).toBeTruthy();
  });

  it('should have a profile container', () => {
    expect(subject.find(StyledProfileContainer).exists()).toBeTruthy();
  });
});