import { Serializer } from '../../../utils/Serializer';
import { AcronymModel } from './AcronymModel';

export class AcronymSerializer implements Serializer<AcronymModel> {
  serialize(item: AcronymModel): {} {
    return {
     id: item.id,
     acronym: item.acronym,
     definition: item.definition
    };
  }

  deserialize(item: any): AcronymModel {
    return new AcronymModel(
      item.id,
      item.acronym,
      item.definition
    );
  }
}