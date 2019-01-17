import { Serializer } from '../../../utils/Serializer';
import { LogableActions, MetricModel } from './MetricModel';

export class MetricSerializer implements Serializer<MetricModel> {
  serialize(item: MetricModel): {} {
    return {
      id: item.id,
      userID: item.userID,
      cardID: item.cardID,
      time: item.time,
      action: LogableActions[item.action],
      context: item.context
    };
  }

  deserialize(item: any): MetricModel {
    return new MetricModel(
      item.id,
      item.userID,
      item.cardID,
      item.time,
      item.action,
      item.context
    );
  }
}