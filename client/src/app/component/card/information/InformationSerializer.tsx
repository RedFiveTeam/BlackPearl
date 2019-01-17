import { InformationModel } from './InformationModel';
import { Serializer } from '../../../utils/Serializer';

export class InformationSerializer implements Serializer<InformationModel> {
  serialize(item: InformationModel): {} {
    return {
      id: item.id,
      name: item.name,
      content: item.content
    };
  }

  deserialize(item: any): InformationModel {
    return new InformationModel(
      item.id,
      item.name,
      item.content
    );
  }
}