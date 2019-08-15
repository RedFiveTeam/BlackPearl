import { LoginActions } from './LoginActions';
import { ProfileStore } from '../../profile/ProfileStore';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ProfileRepository } from '../../profile/ProfileRepository';
import { StubProfileRepository } from '../../profile/StubProfileRepository';
import { ProfileModel } from '../../profile/ProfileModel';
import { StubResourceRepository } from '../resource/repositories/stub/StubResourceRepository';
import { ResourceRepository } from '../resource/repositories/ResourceRepository';
import objectContaining = jasmine.objectContaining;

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
        new ProfileModel(null, 'LASTONE.FIRSTONE.MIDDLE.1', 'first.m.last.mil', 1, 0, 1),
        new ProfileModel(null, 'LASTTWO.FIRSTTWO.MIDDLE.2', 'user2', 1, 0, 1),
        new ProfileModel(null, 'LASTTHREE.FIRSTTHREE.MIDDLE.3', 'firstthree.m.lastthree.mil', 1, 0, 1),
        new ProfileModel(null, 'LASTFOUR.FIRSTFOUR.MIDDLE.4', 'new2', 1, 0, 1)
      ]);

    subject = new LoginActions({profileStore, resourceStore} as any, {profileRepository, resourceRepository} as any);
  });

  it('should login as guest', async () => {
    let setProfileSpy = jest.fn();
    profileStore.setProfile = setProfileSpy;
    await subject.loginAsGuest();
    expect(setProfileSpy).toHaveBeenCalled();
  });

  it('should link new username with existing resources', () => {
    profileStore.setUsername('UserName');
    profileStore.setSelectedProfile(profileStore.profiles[0]);
    expect(subject.updateProfileWithExistingResources()).toBeTruthy();
  });

  it('should edit the profile', async () => {
    let updateProfileSpy = jest.fn();
    profileRepository.updateProfile = updateProfileSpy;
    profileStore.setSelectedProfile(profileStore.profiles[0]);
    profileStore.setUsername('user1');
    await subject.editProfile();
    expect(updateProfileSpy).toHaveBeenCalledWith(profileStore.selectedProfile);
  });

  it('should check for a match between altIDs when logging in', async () => {
    let setProfileSpy = jest.fn();
    profileStore.setProfile = setProfileSpy;
    await subject.login('firstthree.m.lastthree.mil');
    expect(setProfileSpy).toHaveBeenCalledWith(profileStore.profiles[2]);
  });

  it('should check for matches between the altID and cardID when logging in', async () => {
    let loginSpy = jest.fn();
    profileRepository.login = loginSpy;
    await subject.login('firstfour.m.lastfour.mil');
    expect(loginSpy).toHaveBeenCalledWith(profileStore.profiles[3]);
  });

  it('should log you in as a new user if no matches are found', async() => {
    let loginSpy = jest.fn();
    profileRepository.login = loginSpy;
    await subject.login('you.are.garbage.mil');
    expect(loginSpy).toHaveBeenCalledWith(objectContaining({altID: 'you.are.garbage.mil'}));
  });

  it('should validate the user login info', () => {
    expect(subject.validateLogin('tyler.b.cronin.mil')).toBeTruthy();
    expect(subject.validateLogin('tyler.b')).toBeFalsy();
    expect(subject.validateLogin('tyler')).toBeFalsy();
  });

  it('should set potentialMatches to true if matches found', async () => {
    profileStore.setProfiles(
      [
        new ProfileModel(null, 'LASTT.FIRSTT.M', '', 1, 0, 1)
      ]
    );
    await subject.login('first.m.last');
    expect(profileStore.loginMatches.length).toBe(1);
  });

  it('should check for an approximate match against the alt id', async () => {
    await subject.findApproximateMatch('frst.m.last.mil');
    expect(profileStore.approximateMatch).toBeTruthy();
  });
});
