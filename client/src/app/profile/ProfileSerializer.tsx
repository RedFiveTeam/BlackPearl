import { Serializer } from '../utils/Serializer';
import { ProfileModel } from './ProfileModel';

export class ProfileSerializer implements Serializer<ProfileModel> {
  serialize(item: ProfileModel): {} {
    return {
      id: item.id,
      cardID: item.cardID,
      altID: item.altID,
      specialty: item.specialty,
      sort: item.sort,
      widgets: item.widgetsVisible,
    };
  }

  deserialize(item: any): ProfileModel {
    return new ProfileModel(
      item.id,
      item.cardID,
      item.altID,
      item.specialty,
      item.sort,
      item.widgets,
    );
  }
}
