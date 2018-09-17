export class PersonModel {
  constructor(public id: number,
              public firstName: string,
              public lastName: string) {
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }
}