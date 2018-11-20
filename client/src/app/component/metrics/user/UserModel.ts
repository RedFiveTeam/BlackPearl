export class UserModel {
  constructor(
    private _id: number = -1,
    private _name: string = '',
    private _cardId: string,
  ) {
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get cardId(): string {
    return this._cardId;
  }
}