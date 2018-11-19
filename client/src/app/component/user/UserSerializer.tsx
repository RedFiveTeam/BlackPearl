import { Serializer } from '../../utils/serializer';
import { UserModel } from './UserModel';

export class UserSerializer implements Serializer<UserModel> {
  serialize(item: UserModel): {} {
    return {
      id: item.id,
      name: item.name
    };
  }

  deserialize(item: any): UserModel {
    console.log('-----------');
    return new UserModel(
      item.id,
      item.name
    );
  }
}