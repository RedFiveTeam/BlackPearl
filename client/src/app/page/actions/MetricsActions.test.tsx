import { MetricsActions } from './MetricsActions.tsx';
import { StubUserRepository } from '../../component/user/StubUserRepository';
import { UserRepository } from '../../component/user/UserRepository';

describe('MetricsActions', () => {
  let subject: MetricsActions;
  let userRepository: UserRepository;
  let metricsStore: any;

  beforeEach(() => {
    metricsStore = {
      hydrate: jest.fn()
    };

    userRepository = new StubUserRepository();
    subject = new MetricsActions({metricsStore}, {userRepository});
  });

  it('should hydrate the store on initialize', async () => {
    await subject.initializeStores();
    expect(metricsStore.hydrate).toHaveBeenCalledWith(userRepository);
  });
});