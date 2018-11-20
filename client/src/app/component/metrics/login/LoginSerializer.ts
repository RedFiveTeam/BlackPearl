import { Serializer } from '../../../utils/serializer';
import { LoginModel } from './LoginModel';

export class LoginSerializer implements Serializer<LoginModel> {
  serialize(item: LoginModel): {} {
    return {
      cardId: item.user.cardId,
      time: item.time
    };
  }

  deserialize(item: any): LoginModel {
    return new LoginModel(
      item.user,
      item.time
    );
  }
}