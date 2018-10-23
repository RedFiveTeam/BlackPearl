import { TimeRepository } from './TimeRepository';
import { HTTPClient } from '../../HTTPClient';
import { TimeSerializer } from '../serializer/TimeSerializer';
import { TimeModel } from '../TimeModel';

export class WebTimeRepository implements TimeRepository {
  private timeSerializer = new TimeSerializer();

  constructor(private client: HTTPClient) {
  }

  async getTime(): Promise<TimeModel> {
    const json = await this.client.getJSON('/api/time');
    return this.timeSerializer.deserialize(json);
  }
}