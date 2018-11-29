import { Serializer } from '../utils/serializer';
import { ProfileModel } from './ProfileModel';

export class ProfileSerializer implements Serializer<ProfileModel> {
  serialize(item: ProfileModel): {} {
    return {
      id: item.id,
      cardID: item.cardID,
      name: item.name,
      specialty: item.specialty
    };
  }

  deserialize(item: any): ProfileModel {
    return new ProfileModel(
      item.id,
      item.cardID,
      item.name,
      item.specialty
    );
  }
}