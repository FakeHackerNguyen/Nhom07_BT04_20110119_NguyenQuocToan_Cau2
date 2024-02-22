import Realm from 'realm';

export class Token extends Realm.Object {
  static schema = {
    name: 'Token',
    properties: {
      content: 'string?',
    },
  };
}
