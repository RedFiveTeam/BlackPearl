import { Serializer } from '../utils/Serializer';
import { ProfileModel } from './ProfileModel';

export class ProfileSerializer implements Serializer<ProfileModel> {
  serialize(item: ProfileModel): {} {
    return {
      id: item.id,
      cardID: item.cardID,
      specialty: item.specialty,
      sort: item.sort,
      widgets: item.widgetsVisible,
      classification: item.classification
    };
  }

  deserialize(item: any): ProfileModel {
    return new ProfileModel(
      item.id,
      item.cardID,
      item.specialty,
      item.sort,
      item.widgets,
      item.classification
    );
  }
}