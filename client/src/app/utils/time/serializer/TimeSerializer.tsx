import { TimeModel } from '../TimeModel';
import { Serializer } from '../../serializer';

export class TimeSerializer implements Serializer<TimeModel> {
  serialize(item: TimeModel): {} {
    return {
      timeStamp: item.timeStamp
    };
  }

  deserialize(item: any): TimeModel {
    return new TimeModel(
      item.timeStamp
    );
  }
}