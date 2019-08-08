import { mount, ReactWrapper } from 'enzyme';
import { StyledLoginPopup } from './LoginPopup';
import * as React from 'react';
import { ProfileStore } from '../../profile/ProfileStore';
import { Provider } from 'mobx-react';
import { LoginActions } from '../login/LoginActions';
import { StubProfileRepository } from '../../profile/StubProfileRepository';

describe('LoginPopup', () => {
  let subject: ReactWrapper;
  let profileStore: ProfileStore;
  let profileActions: any;
  let resourceActions: any;
  let loginActions: any;
  let profileRepository: StubProfileRepository;

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

    profileRepository = new StubProfileRepository();

    loginActions = new LoginActions({profileStore} as any, {profileRepository} as any);

    subject = mount(
      <Provider
        loginActions={loginActions}
        resourceActions={resourceActions}
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

    let loginSpy = jest.fn();
    loginActions.login = loginSpy;

    expect(subject.find('#userName').simulate('change', {target: {value: 'test.test.test'}}));
    await subject.find('.submitButton').simulate('click');
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should have a button that logs you in as a guest', () => {
    let loginAsGuestSpy = jest.fn();
    loginActions.loginAsGuest = loginAsGuestSpy;
    expect(subject.find('.guestButton').simulate('click'));
    expect(loginAsGuestSpy).toHaveBeenCalled();
  });
});
