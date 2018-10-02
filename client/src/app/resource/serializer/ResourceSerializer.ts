import { Serializer } from '../../utils/serializer';
import { ResourceModel } from '../ResourceModel';

export class ResourceSerializer implements Serializer<ResourceModel> {
  serialize(item: ResourceModel): {} {
    throw new Error('Not Implemented');
  }

  deserialize(item: any): ResourceModel {
    return new ResourceModel(
      item.id,
      item.url,
      item.name
    );
  }
}