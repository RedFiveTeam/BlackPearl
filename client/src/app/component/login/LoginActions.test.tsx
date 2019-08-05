import { LoginActions } from './LoginActions';
import { ProfileStore } from '../../profile/ProfileStore';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ProfileRepository } from '../../profile/ProfileRepository';
import { StubProfileRepository } from '../../profile/StubProfileRepository';
import { ProfileModel } from '../../profile/ProfileModel';
import { StubResourceRepository } from '../resource/repositories/stub/StubResourceRepository';
import { ResourceRepository } from '../resource/repositories/ResourceRepository';

describe('LoginActions', () => {
  let subject: LoginActions;
  let profileStore: ProfileStore;
  let profileRepository: ProfileRepository;
  let resourceStore: ResourceStore;
  let resourceRepository: ResourceRepository;

  beforeEach(() => {
    profileStore = new ProfileStore();
    resourceStore = new ResourceStore();
    profileRepository = new StubProfileRepository();
    resourceRepository = new StubResourceRepository();

    profileStore.setProfiles(
      [
        new ProfileModel(null, 'user1', 'user1', 1, 0, 1, 'class'),
        new ProfileModel(null, 'user2', 'user2', 1, 0, 1, 'class'),
        new ProfileModel(null, 'new1', 'new1', 1, 0, 1, 'class'),
        new ProfileModel(null, 'new2', 'new2', 1, 0, 1, 'class')
      ]);

    subject = new LoginActions({profileStore, resourceStore} as any, {profileRepository, resourceRepository} as any);
  });

  it('should log user in', async () => {
    let setProfileSpy = jest.fn();
    profileStore.setProfile = setProfileSpy;
    await subject.login('AltId');
    expect(setProfileSpy).toHaveBeenCalled();
  });

  it('should login as guest', async () => {
    let setProfileSpy = jest.fn();
    subject.login = setProfileSpy;
    await subject.loginAsGuest();
    expect(setProfileSpy).toHaveBeenCalledWith('Guest');
  });

  it('should link new username with existing resources', () => {
    profileStore.setUsername('UserName');
    profileStore.setSelectedProfile(profileStore.profiles[0]);
    expect(subject.updateProfileWithExistingResources()).toBeTruthy();
  });

  it('should update the old resources to the new account', async () => {
    resourceStore.setUnfilteredResources(await resourceRepository.findAll());
    subject.linkOldResources(profileStore.profiles[0], 'RdyPlayer1');
    expect(resourceStore.unfilteredResources[2].accountID).toBe('RdyPlayer1');
  });

  it('should edit the profile', async () => {
    let updateProfileSpy = jest.fn();
    profileRepository.updateProfile = updateProfileSpy;
    profileStore.setSelectedProfile(profileStore.profiles[0]);
    profileStore.setUsername('user1');
    await subject.editProfile();
    expect(updateProfileSpy).toHaveBeenCalledWith(profileStore.selectedProfile);
  });
});