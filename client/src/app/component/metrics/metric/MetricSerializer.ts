import { Serializer } from '../../../utils/serializer';
import { MetricModel } from './MetricModel';
import { UserModel } from '../user/UserModel';
import * as moment from 'moment';

export class MetricSerializer implements Serializer<MetricModel> {
  serialize(item: MetricModel): {} {
    return {
      cardId: item.user.cardId,
      time: item.time
    };
  }

  deserialize(item: any): MetricModel {
    return new MetricModel(
      new UserModel(item.account.id, item.account.name, item.account.cardID),
      moment(item.time)
    );
  }
}