import { TimeModel } from '../TimeModel';
import { Serializer } from '../../../../utils/Serializer';

export class TimeSerializer implements Serializer<TimeModel> {
  serialize(item: TimeModel): {} {
    return {
      timestamp: item.timestamp,
      zones: item.zones
    };
  }

  deserialize(item: any): TimeModel {
    return new TimeModel(
      item.timestamp,
      item.zones
    );
  }
}