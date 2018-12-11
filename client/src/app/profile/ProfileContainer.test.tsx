import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProfileContainer } from './ProfileContainer';
import { StyledATODay } from '../component/widgets/time/ATODay';

describe('ProfileContainer', () => {
  let subject: ShallowWrapper;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {};

    subject = shallow(
      <ProfileContainer
        profileStore={profileStore}
      />
    );
  });

  it('should render an ATO date', () => {
    expect(subject.find(StyledATODay).exists()).toBeTruthy();
  });
});