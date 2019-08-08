import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { FindLoginPopup } from './FindLoginPopup';
import { ProfileActions } from '../../profile/ProfileActions';
import { StubProfileRepository } from '../../profile/StubProfileRepository';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileModel } from '../../profile/ProfileModel';
import { StyledListRow } from '../list/ListRow';
import { Provider } from 'mobx-react';

describe('FindLoginPopup', () => {
  let subject: ReactWrapper;
  let loginActions: any;
  let profileStore: ProfileStore;
  let profileActions: ProfileActions;
  let resourceActions: any;
  let profileRepository: StubProfileRepository;
  let profile: ProfileModel;

  beforeEach(() => {

    loginActions = {
      updateProfileWithExistingResources: jest.fn()
    };

    profileRepository = new StubProfileRepository();

    profile = new ProfileModel(1, 'test', 'test', 1, 1, 1);

    profileStore = new ProfileStore();
    profileStore.setProfile(profile);

    profileActions = new ProfileActions({profileStore} as any, {profileRepository} as any);

    resourceActions = {
      setAllResources: jest.fn(),
    };

    subject = mount(
      <Provider
        profileStore={profileStore}
        loginActions={loginActions}
      >
        <FindLoginPopup
          loginActions={loginActions}
          profileActions={profileActions}
          profileStore={profileStore}
          resourceActions={resourceActions}
        />
      </Provider>
    );
  });

  it('should allow user to search & select an existing account', () => {
    expect(subject.find('#findUsername').simulate('change', {target: {value: 'guest.guest'}}));
    expect(subject.find(StyledListRow).text()).toBe('GUEST.GUEST.GUEST.0123456789');
  });

  it('should run the login method when clicked', () => {
    let updateProfileWithExistingResourcesSpy = jest.fn();
    loginActions.updateProfileWithExistingResources = updateProfileWithExistingResourcesSpy;
    subject.find('.submitButton').simulate('click');
    expect(updateProfileWithExistingResourcesSpy).toHaveBeenCalled();
  });

  it('should give the user an option to go back to the login page', () => {
    let setHasOldProfileSpy = jest.fn();
    let setHasProfileSpy = jest.fn();
    profileStore.setHasOldProfile = setHasOldProfileSpy;
    profileStore.setHasProfile = setHasProfileSpy;

    subject.find('.backButton').simulate('click');
    expect(setHasOldProfileSpy).toHaveBeenCalledWith(false);
    expect(setHasProfileSpy).toHaveBeenCalledWith(false);
  });
});
