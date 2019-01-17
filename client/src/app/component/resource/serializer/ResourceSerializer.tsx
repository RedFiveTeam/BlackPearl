import { Serializer } from '../../../utils/Serializer';
import { ResourceModel } from '../ResourceModel';

export class ResourceSerializer implements Serializer<ResourceModel> {
  serialize(item: ResourceModel): {} {
    return {
      id: item.id,
      name: item.name,
      url: item.url,
      categoryID: item.categoryID,
      accountID: item.accountID,
      position: item.position
    };
  }

  deserialize(item: any): ResourceModel {
    return new ResourceModel(
      item.id,
      item.url,
      item.name,
      item.categoryID,
      item.accountID,
      item.position
    );
  }
}