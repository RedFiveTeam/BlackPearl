import { BlameRepository } from './BlameRepository';
import { BlameSerializer } from '../BlameSerializer';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { BlameModel } from '../BlameModel';

export class WebBlameRepository implements BlameRepository {
  private blameSerializer = new BlameSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<BlameModel[]> {
    const json = await this.client.getJSON('/api/blame');
    return json.map((obj: any) => {
      return this.blameSerializer.deserialize(obj);
    });
  }
}