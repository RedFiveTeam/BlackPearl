import { Serializer } from '../../../utils/serializer';
import { ResourceModel } from '../ResourceModel';

export class ResourceSerializer implements Serializer<ResourceModel> {
  serialize(item: ResourceModel): {} {
    return {
      id: item.id,
      name: item.name,
      url: item.url,
      categoryID: item.categoryID
    };
  }

  deserialize(item: any): ResourceModel {
    return new ResourceModel(
      item.id,
      item.url,
      item.name,
      item.categoryID
    );
  }
}