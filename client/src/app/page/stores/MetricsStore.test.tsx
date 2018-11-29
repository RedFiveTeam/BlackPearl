import { MetricsStore } from './MetricsStore';
import { StubLoginRepository } from '../../component/metrics/login/StubLoginRepository';
import { LoginRepository } from '../../component/metrics/login/LoginRepository.tsx';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { StubUserRepository } from '../../component/metrics/user/StubUserRepository';

describe('MetricsStore', () => {
  let subject: MetricsStore;
  let userRepository: UserRepository;
  let loginRepository: LoginRepository;

  beforeEach(() => {
    userRepository = new StubUserRepository();
    loginRepository = new StubLoginRepository();
    subject = new MetricsStore();
  });

  it('should set the users from a service on hydrate', async () => {
    await subject.hydrate(userRepository, loginRepository);
    expect(subject.userCount).toBe(3);
  });

  it('should set the logins on hydrate', async () => {
    await subject.hydrate(userRepository, loginRepository);
    expect(subject.logins.length).toBe(2);
  });
});