import { Serializer } from '../utils/serializer';
import { ProfileModel } from './ProfileModel';

export class ProfileSerializer implements Serializer<ProfileModel> {
  serialize(item: ProfileModel): {} {
    return {
      cardID: item.cardID,
      name: item.name
    };
  }

  deserialize(item: any): ProfileModel {
    return new ProfileModel(
      item.cardID,
      item.name
    );
  }
}