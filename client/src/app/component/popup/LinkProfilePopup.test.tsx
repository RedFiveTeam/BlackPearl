import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LinkProfilePopup } from './LinkProfilePopup';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileModel } from '../../profile/ProfileModel';

describe('LinkProfilePopup', () => {
  let subject: ShallowWrapper;
  let profileStore: ProfileStore;
  let loginActions: any;

  beforeEach(() => {

    profileStore = new ProfileStore();

    loginActions = {
      createNewProfile: jest.fn(),
      loginAndLinkProfile: jest.fn()
    };

    profileStore.setLoginMatches([
      new ProfileModel(null, 'cardID1', 'AltId1', 1, 0, 1),
      new ProfileModel(null, 'cardID2', 'AltId2', 1, 0, 1),
      new ProfileModel(null, 'cardID3', 'AltId3', 1, 0, 1)
    ]);

    subject = shallow(
        <LinkProfilePopup
          profileStore={profileStore}
          loginActions={loginActions}
        />
    );
  });

  it('should display a list of potential matches', () => {
    expect(subject.find('.nameRow').length).toBe(3);
  });

  it('should create a new account upon button click', () => {
    subject.find('button').simulate('click');
    expect(loginActions.createNewProfile).toHaveBeenCalled();
  });

  it('should link typo username with account', () => {
    subject.find('.matchedInfo > div > div').at(0).simulate('click');
    expect(loginActions.loginAndLinkProfile).toHaveBeenCalled();
  });

});
