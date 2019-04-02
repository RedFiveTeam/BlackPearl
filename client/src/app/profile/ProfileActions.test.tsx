import { ProfileActions } from './ProfileActions';
import { StubProfileRepository } from './StubProfileRepository';
import { ProfileRepository } from './ProfileRepository';
import { ProfileModel } from './ProfileModel';
import { ProfileStore } from './ProfileStore';

describe('ProfileActions', () => {
  let subject: ProfileActions;
  let profileRepository: ProfileRepository;
  let profileStore: ProfileStore;

  beforeEach(() => {
    profileStore = new ProfileStore();
    profileRepository = new StubProfileRepository();
    profileStore.setProfiles(
      [
        new ProfileModel(null, 'user1', 'user1', 1, 0, 1, 'class'),
        new ProfileModel(null, 'user2', 'user2', 1, 0, 1, 'class'),
        new ProfileModel(null, 'new1', 'new1', 1, 0, 1, 'class'),
        new ProfileModel(null, 'new2', 'new2', 1, 0, 1, 'class')
      ]);
    subject = new ProfileActions({profileStore} as any, {profileRepository} as any);
  });

  it('should get the current fetchAccountByCardId', async () => {
    let setProfileSpy = jest.fn();
    profileStore.setProfile = setProfileSpy;
    await subject.setProfile();
    expect(setProfileSpy).toHaveBeenCalled();
  });

  it('should generate a display name from your altID', () => {
    expect(subject.generateDisplayName(
      new ProfileModel(null, 'new2', 'New Alt ID', 1, 0, 1, 'class'))
    ).toBe('New Alt ID');
  });

  it('should filter profiles based on the search value', () => {
    profileStore.setSearchValue('user');
    subject.filterProfiles();
    expect(profileStore.filteredProfileList.length).toBe(2);
  });
});