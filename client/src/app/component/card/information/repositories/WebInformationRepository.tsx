import { InformationRepository } from './InformationRepository';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { InformationModel } from '../InformationModel';
import { InformationSerializer } from '../InformationSerializer';

export class WebInformationRepository implements InformationRepository {
  private informationSerializer = new InformationSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<InformationModel[]> {
    const json = await this.client.getJSON('/api/information');
    return json.map((obj: any) => {
      return this.informationSerializer.deserialize(obj);
    });
  }

  async update(information: InformationModel[]): Promise<InformationModel[]> {
    const json = await this.client.putJSON(
      '/api/information',
      JSON.stringify(information.map((i) =>
      this.informationSerializer.serialize(i))
      ));
    return json.map((obj: any) => {
      return this.informationSerializer.deserialize(obj);
    });
  }
}