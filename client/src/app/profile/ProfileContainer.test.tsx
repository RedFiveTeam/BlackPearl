import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProfileContainer } from './ProfileContainer';
import { PersonIcon } from '../icon/PersonIcon';

describe('ProfileContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <ProfileContainer
        className="profileSection"
        displayName="first last"
      />
    );
  });

  it('should contain a title case profile name', () => {
    expect(
      subject
        .find('.username')
        .text()
    ).toBe('First Last');
  });

  it('should have a user icon', () => {
    expect(
      subject
        .find(PersonIcon)
        .exists()
    ).toBeTruthy();
  });
});
