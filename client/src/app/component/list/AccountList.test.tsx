import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AccountList } from './AccountList';
import { ProfileModel } from '../../profile/ProfileModel';
import { StyledListRow } from './ListRow';
import { ProfileStore } from '../../profile/ProfileStore';

describe('AccountList', () => {
  let subject: ReactWrapper;
  let accountList: ProfileModel[];
  let profileStore: ProfileStore;

  beforeEach(() => {

    profileStore = new ProfileStore();

    accountList = [
      new ProfileModel(1, '', '', 1, 0, 1),
      new ProfileModel(1, '', '', 1, 0, 1),
      new ProfileModel(1, '', '', 1, 0, 1)
    ];

    subject = mount(
        <AccountList
          accountList={accountList}
          profileStore={profileStore}
        />
    );
  });

  it('should render a list of account names', () => {
    expect(subject.find(StyledListRow).length).toEqual(3);
  });

  it('should set selected Profile onClick', () => {
    let selectProfileSpy = jest.fn();
    profileStore.setSelectedProfile = selectProfileSpy;
    subject.find(StyledListRow).at(0).simulate('click');
    expect(selectProfileSpy).toHaveBeenCalledWith(accountList[0]);
  });
});
