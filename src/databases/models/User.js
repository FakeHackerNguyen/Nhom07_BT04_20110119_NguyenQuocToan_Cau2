import {createRealmContext} from '@realm/react';
import Realm from 'realm';

export class User extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: 'accessToken',
    properties: {
      accessToken: 'string',
    },
  };
}
