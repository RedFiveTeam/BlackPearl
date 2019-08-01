import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBanner } from './AppBanner';
import { StyledATODay } from './widgets/time/ATODay';
import { ATODayBorderIcon } from '../icon/ATODayBorderIcon';
import { StyledTimeContainer } from './widgets/time/TimeContainer';
import { StyledProfileContainer } from '../profile/ProfileContainer';
import { ProfileModel } from '../profile/ProfileModel';

describe('AppBanner', () => {
  let subject: ShallowWrapper;
  let profileActions: any;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {
      profile: new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1)
    };

    profileActions = {
      setProfile: jest.fn(),
      generateDisplayName: () => 'Display Name'
    };

    subject = shallow(
      <AppBanner
        profileActions={profileActions}
        profileStore={profileStore}
      />
    );
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
    expect(
      subject
        .find(StyledProfileContainer)
        .prop('displayName'))
      .toBe(profileActions.generateDisplayName()
      );
  });
});
