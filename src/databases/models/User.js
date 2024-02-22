import Realm from 'realm';

export class User extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      email: 'string',
      password: 'string',
    },
  };
}
