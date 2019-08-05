import { ClassificationRepository } from './ClassificationRepository';
import { HTTPClient } from '../../../utils/HTTPClient';
import { ClassificationModel } from '../ClassificationModel';
import { ClassificationSerializer } from '../ClassificationSerializer';

export class WebClassificationRepository implements ClassificationRepository {
  private classificationSerializer = new ClassificationSerializer();

  constructor(private client: HTTPClient) {
  }

  async get(): Promise<ClassificationModel> {
    const json = await this.client.getJSON('api/classification');
    return this.classificationSerializer.deserialize(json);
  }
}
