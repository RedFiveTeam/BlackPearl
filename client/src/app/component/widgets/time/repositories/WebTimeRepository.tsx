import { TimeRepository } from './TimeRepository';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { TimeSerializer } from '../serializer/TimeSerializer';
import { TimeModel } from '../TimeModel';
import { TimezoneModel } from '../TimezoneModel';
import { TimezoneSerializer } from '../serializer/TimezoneSerializer';

export class WebTimeRepository implements TimeRepository {
  private timeSerializer = new TimeSerializer();
  private timezoneSerializer = new TimezoneSerializer();

  constructor(private client: HTTPClient) {
  }

  async getTime(): Promise<TimeModel> {
    const json = await this.client.getJSON('/api/time');
    return this.timeSerializer.deserialize(json);
  }

  async update(timezones: TimezoneModel[]): Promise<TimezoneModel[]> {
    const json = await this.client.putJSON(
      '/api/timezones',
      JSON.stringify(timezones.map((tz) =>
        this.timezoneSerializer.serialize(tz))
      ));
    return json.map((obj: any) => {
      return this.timezoneSerializer.deserialize(obj);
    });
  }

  async getTimezones(): Promise<TimezoneModel[]> {
    const json = await this.client.getJSON('/api/timezones');
    return json.map((obj: any) => {
      return this.timezoneSerializer.deserialize(obj);
    });
  }
}