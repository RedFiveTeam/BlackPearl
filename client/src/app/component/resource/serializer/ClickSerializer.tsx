import { Serializer } from '../../../utils/Serializer';
import { ClickModel } from '../ClickModel';

export class ClickSerializer implements Serializer<ClickModel> {
  serialize(item: ClickModel): {} {
    return {};
  }

  deserialize(item: any): ClickModel {
    return new ClickModel(
      item.resourceID,
      item.clicks
    );
  }
}