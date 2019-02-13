import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProfileContainer } from './ProfileContainer';
import { PersonIcon } from '../icon/PersonIcon';

describe('ProfileContainer', () => {
  let subject: ShallowWrapper;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {
      profile: {
        cardID: 'FIRST.MIDDLE.LAST.0123456789'
      }
    };

    subject = shallow(
      <ProfileContainer
        profileStore={profileStore}
        className="profileSection"
        displayName="first last"
      />
    );
  });

  it('should contain a profile name', () => {
    expect(subject.find('.username').text()).toBe('first last');
    expect(subject.find(PersonIcon).exists()).toBeTruthy();
  });
});