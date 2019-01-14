import { AcronymRepository } from './AcronymRepository';
import { AcronymSerializer } from '../AcronymSerializer';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { AcronymModel } from '../AcronymModel';

export class WebAcronymRepository implements AcronymRepository {
  private acronymSerializer = new AcronymSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<AcronymModel[]> {
    const json = await this.client.getJSON('/api/acronyms');
    return json.map((obj: any) => {
      return this.acronymSerializer.deserialize(obj);
    });
  }

  async saveAcronym(acronym: AcronymModel): Promise<AcronymModel> {
    const body = JSON.stringify(this.acronymSerializer.serialize(acronym));
    const json = await this.client.postJSON('/api/acronyms', body);
    return this.acronymSerializer.deserialize(json);
  }

  async deleteAcronym(acronym: AcronymModel): Promise<void> {
    await this.client.delete('api/acronyms', acronym.id!.toString());
    return Promise.resolve();
  }

  async updateAcronym(acronym: AcronymModel): Promise<AcronymModel> {
    const body = JSON.stringify(this.acronymSerializer.serialize(acronym));
    const json = await this.client.putJSON('/api/acronyms/', body);
    return Promise.resolve(json);
  }
}