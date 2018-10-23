import { TimeModel } from '../TimeModel';
import { Serializer } from '../../serializer';

export class TimeSerializer implements Serializer<TimeModel> {
  serialize(item: TimeModel): {} {
    return {
      timestamp: item.timestamp
    };
  }

  deserialize(item: any): TimeModel {
    return new TimeModel(
      item.timestamp
    );
  }
}