import { Serializer } from '../../../utils/Serializer';
import { BlameModel } from './BlameModel';

export class BlameSerializer implements Serializer<BlameModel> {
  serialize(item: BlameModel): {} {
    return {
      id: item.id,
      action: item.action,
      name: item.name,
      user: item.user,
      time: item.time
    };
  }

  deserialize(item: any): BlameModel {
    return new BlameModel(
      item.id,
      item.action,
      item.name,
      item.user,
      item.time
    );
  }
}