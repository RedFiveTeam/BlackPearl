import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProfileContainer } from './ProfileContainer';

describe('ProfileContainer', () => {
  let subject: ShallowWrapper;
  let profileStore: any;
  let profileActions: any;
  let resourceActions: any;

  beforeEach(() => {
    profileStore = {
    };

    profileActions = {
      updateSort: jest.fn()
    };

    resourceActions = {
      sortResources: jest.fn()
    };

    subject = shallow(
      <ProfileContainer
        profileStore={profileStore}
        profileActions={profileActions}
        resourceActions={resourceActions}
      />
    );
  });

  it('should display an profile banner', () => {
    expect(subject.find('.profileBanner').exists()).toBeTruthy();
  });

  it('should display a sort by selector', () => {
    expect(subject.find('.sortSelector').exists()).toBeTruthy();
  });

  it('should save the sort option', async () => {
    subject.find('select').simulate('change', {target: {value: 'Newest'}});
    await expect(profileActions.updateSort).toHaveBeenCalled();
    expect(resourceActions.sortResources).toHaveBeenCalled();
  });
});