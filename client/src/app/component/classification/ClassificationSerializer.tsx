import { Serializer } from '../../utils/Serializer';
import { ClassificationModel } from './ClassificationModel';

export class ClassificationSerializer implements Serializer <ClassificationModel> {
  serialize(item: ClassificationModel): {} {
    return {
      classification: item.classification
    };
  }

  deserialize(item: any): ClassificationModel {
    return new ClassificationModel(
      item.classification
    );
  }
}