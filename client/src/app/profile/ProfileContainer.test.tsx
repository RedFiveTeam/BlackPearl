import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProfileContainer } from './ProfileContainer';
import { PersonIcon } from '../icon/PersonIcon';

describe('ProfileContainer', () => {
  let subject: ShallowWrapper;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {
      displayLogoutModal: jest.fn(),
      setDisplayLogoutModal: jest.fn()
    };

    subject = shallow(
      <ProfileContainer
        className="profileSection"
        displayName="first last"
        profileStore={profileStore}
      />
    );
  });

  it('should contain a title case profile name', () => {
    expect(subject.find('.username').text()).toBe('first last');
  });

  it('should have a user icon', () => {
    expect(subject.find(PersonIcon).exists()).toBeTruthy();
  });

  it('should have a logout button that opens a confirm modal', () => {
    expect(subject.find('.logout').simulate('click'));
    expect(profileStore.displayLogoutModal).toBeTruthy();
  });
});
