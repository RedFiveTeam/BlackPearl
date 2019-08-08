import * as React from 'react';
import { mount, ReactWrapper, } from 'enzyme';
import { ConfirmLogoutPopup } from './ConfirmLogoutPopup';
import { ProfileStore } from '../../profile/ProfileStore';

describe('ConfirmLogoutPopup', () => {
  let subject: ReactWrapper;
  let profileStore: ProfileStore;
  let profileActions: any;

  beforeEach(() => {
    profileActions = {
      deleteCookie: jest.fn()
    };

    profileStore = new ProfileStore();

    subject = mount(
        <ConfirmLogoutPopup
          profileActions={profileActions}
          profileStore={profileStore}
        />
    );
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(profileStore.displayLogoutModal).toBeFalsy();
  });

  it('should log you out when yes is clicked', () => {
    profileStore.setDisplayLogoutModal(true);

    subject.find('.confirmBtn').simulate('click');
    expect(profileStore.hasProfile).toBeFalsy();
    expect(profileStore.displayLogoutModal).toBeFalsy();
    expect(profileActions.deleteCookie).toHaveBeenCalled();
  });
});
