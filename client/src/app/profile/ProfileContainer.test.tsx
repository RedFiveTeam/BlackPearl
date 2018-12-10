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

  it('should display a filter section', () => {
    expect(subject.find('.filterSection').exists()).toBeTruthy();
  });

  it('should save the sort option', async () => {
    subject.find('select').simulate('change', {target: {value: 2}});
    await expect(profileActions.updateSort).toHaveBeenCalled();
    await expect(resourceActions.sortResources).toHaveBeenCalled();
  });
});