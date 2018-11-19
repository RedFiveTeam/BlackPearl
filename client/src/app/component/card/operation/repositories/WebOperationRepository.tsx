import { OperationRepository } from './OperationRepository';
import { OperationSerializer } from '../OperationSerializer';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { OperationModel } from '../OperationModel';

export class WebOperationRepository implements OperationRepository {
  private operationSerializer = new OperationSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<OperationModel[]> {
    const json = await this.client.getJSON('/api/operations');
    return json.map((obj: any) => {
      return this.operationSerializer.deserialize(obj);
    });
  }

  async saveOperation(operation: OperationModel): Promise<OperationModel> {
    const body = JSON.stringify(this.operationSerializer.serialize(operation));
    const json = await this.client.postJSON('api/operations', body);
    return this.operationSerializer.deserialize(json);
  }
}