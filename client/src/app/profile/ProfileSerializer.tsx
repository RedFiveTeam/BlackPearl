import { Serializer } from '../utils/serializer';
import { ProfileModel } from './ProfileModel';

export class ProfileSerializer implements Serializer<ProfileModel> {
  serialize(item: ProfileModel): {} {
    return {
      cardId: item.cardId,
      name: item.name
    };
  }

  deserialize(item: any): ProfileModel {
    return new ProfileModel(
      item.cardId,
      item.name
    );
  }
}