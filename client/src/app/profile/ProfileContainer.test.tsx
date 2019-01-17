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
        name: 'Test User'
      }
    };

    subject = shallow(
      <ProfileContainer
        profileStore={profileStore}
        className="profileSection"
      />
    );
  });

  it('should contain a profile name', () => {
    expect(subject.find('.profileSection').at(0).prop('children')).toContain('Test User');
    expect(subject.find(PersonIcon).exists()).toBeTruthy();
  });
});