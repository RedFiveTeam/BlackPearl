import { Serializer } from '../../../utils/serializer';
import { LoginModel } from './LoginModel';
import { UserModel } from '../user/UserModel';
import * as moment from 'moment';

export class LoginSerializer implements Serializer<LoginModel> {
  serialize(item: LoginModel): {} {
    return {
      cardId: item.user.cardId,
      time: item.time
    };
  }

  deserialize(item: any): LoginModel {
    return new LoginModel(
      new UserModel(item.account.id, item.account.name, item.account.cardID),
      moment(item.time)
    );
  }
}