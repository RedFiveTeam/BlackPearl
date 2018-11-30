import { StubUserRepository } from '../../component/metrics/user/StubUserRepository';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { LoginRepository } from '../../component/metrics/login/LoginRepository.tsx';
import { StubLoginRepository } from '../../component/metrics/login/StubLoginRepository';
import { MetricsActions } from './MetricsActions';

describe('MetricsActions', () => {
  let subject: MetricsActions;
  let userRepository: UserRepository;
  let loginRepository: LoginRepository;
  let metricsStore: any;

  beforeEach(() => {
    metricsStore = {
      hydrate: jest.fn()
    };

    userRepository = new StubUserRepository();
    loginRepository = new StubLoginRepository();
    subject = new MetricsActions({metricsStore}, {userRepository, loginRepository});
  });

  it('should hydrate the store on initialize', async () => {
    await subject.initializeStores();
    expect(metricsStore.hydrate).toHaveBeenCalledWith(userRepository, loginRepository);
  });
});