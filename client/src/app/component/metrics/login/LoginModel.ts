import { UserModel } from '../user/UserModel';
import { Moment } from 'moment-timezone';
import moment = require('moment-timezone');

export class LoginModel {
  constructor(private _user: UserModel, private _time: Moment) {
  }

  get user(): UserModel {
    return this._user;
  }

  get time(): moment.Moment {
    return this._time;
  }
}