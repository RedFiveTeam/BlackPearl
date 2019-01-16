/* tslint:disable:no-empty*/
import { LoadingStore } from './LoadingStore';

describe('LoadingNotificationStore', () => {
  it('should set loading until the child function completes', async () => {
    const subject = new LoadingStore();

    subject.setLoading(true);

    await subject.performLoading(async () => {});

    expect(subject.loading).toBeFalsy();
  });
});