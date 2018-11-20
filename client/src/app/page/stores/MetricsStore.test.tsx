import { MetricsStore } from './MetricsStore';
import { UserModel } from '../../component/metrics/user/UserModel';

describe('MetricsStore', () => {
  let subject: MetricsStore;
  let users = [new UserModel(1, 'u1', 'card1'), new UserModel(2, 'u2', 'card2'), new UserModel(3, 'u3', 'card3')];

  let userRepository: any;

  beforeEach(() => {
    userRepository = {
      findAll: () => {
        return Promise.resolve(users);
      }
    };

    subject = new MetricsStore();
  });

  it('should set the users from a service on hydrate', async () => {
    await subject.hydrate(userRepository);
    expect(subject.userCount).toBe(3);
  });
});