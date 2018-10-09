import { NotificationStore } from './NotificationStore';

/* tslint:disable:no-empty*/
describe('NotificationStore', () => {
  it('should set loading until the child function completes', async () => {
    const subject = new NotificationStore();

    subject.setLoading(true);

    await subject.performLoading(async () => {});

    expect(subject.loading).toBeFalsy();
  });

});