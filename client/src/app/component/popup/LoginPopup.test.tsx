import { mount, ReactWrapper } from 'enzyme';
import { StyledLoginPopup } from './LoginPopup';
import * as React from 'react';
import { ProfileStore } from '../../profile/ProfileStore';
import { Provider } from 'mobx-react';

describe('LoginPopup', () => {
  let subject: ReactWrapper;
  let profileStore: ProfileStore;
  let profileActions: any;
  let resourceActions: any;
  let loginActions: any;

  beforeEach(() => {
    loginActions = {
      login: jest.fn(),
      loginAsGuest: jest.fn()
    };

    profileActions = {
      getAllProfiles: jest.fn(),
      login: jest.fn(),
      loginAsGuest: jest.fn()
    };

    profileStore = new ProfileStore();

    resourceActions = {
      setAllResources: jest.fn()
    };

    subject = mount(
      <Provider
        loginActions={loginActions}
      >
        <StyledLoginPopup
          profileStore={profileStore}
          profileActions={profileActions}
          resourceActions={resourceActions}
        />
      </Provider>
    );
  });

  it('should display an input for the username that sets the username', () => {
    let setUsernameSpy = jest.fn();
    profileStore.setUsername = setUsernameSpy;
    expect(subject.find('#userName').simulate('change', {target: {value: 'test'}}));
    expect(setUsernameSpy).toHaveBeenCalledWith('test');
  });

  it('should have a login button that logs you in if you have entered a username', async () => {
    await subject.find('.submitButton').simulate('click');
    expect(resourceActions.setAllResources).not.toHaveBeenCalled();

    expect(subject.find('#userName').simulate('change', {target: {value: 'test'}}));
    await subject.find('.submitButton').simulate('click');
    expect(resourceActions.setAllResources).toHaveBeenCalled();
  });

  it('should have a link for people who already had accounts', () => {
    let setHasOldProfileSpy = jest.fn();
    let setHasProfileSpy = jest.fn();
    profileStore.setHasOldProfile = setHasOldProfileSpy;
    profileStore.setHasProfile = setHasProfileSpy;

    expect(subject.find('.oldProfileText').exists()).toBeTruthy();
    subject.find('.oldProfileText').simulate('click');
    expect(profileStore.setHasOldProfile).toHaveBeenCalledWith(true);
    expect(profileStore.setHasProfile).toHaveBeenCalledWith(true);
  });

  it('should have a button that logs you in as a guest', () => {
    expect(subject.find('.guestButton').simulate('click'));
    expect(loginActions.loginAsGuest).toHaveBeenCalled();
  });
});