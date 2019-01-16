import { Serializer } from '../../../utils/Serializer';
import { OperationModel } from './OperationModel';

export class OperationSerializer implements Serializer<OperationModel> {
  serialize(item: OperationModel): {} {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      address: item.address
    };
  }

  deserialize(item: any): OperationModel {
    return new OperationModel(
      item.id,
      item.title,
      item.description,
      item.address
    );
  }
}