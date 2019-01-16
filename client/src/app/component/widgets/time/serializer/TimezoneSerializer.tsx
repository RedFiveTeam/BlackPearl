import { Serializer } from '../../../../utils/Serializer';
import { TimezoneModel } from '../TimezoneModel';

export class TimezoneSerializer implements Serializer<TimezoneModel> {
  serialize(item: TimezoneModel): {} {
    return {
      id: item.id,
      position: item.position,
      zone: item.zone,
      name: item.name,
    };
  }

  deserialize(item: any): TimezoneModel {
    return new TimezoneModel(
      item.id,
      item.position,
      item.zone,
      item.name
    );
  }
}