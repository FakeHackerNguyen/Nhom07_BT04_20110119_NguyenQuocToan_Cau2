import {createRealmContext} from '@realm/react';
import Realm from 'realm';

export class User extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      email: 'string',
      password: 'string',
      isRemember: 'bool',
    },
  };
}

const config = {
  schema: [User],
  // Increment the 'schemaVersion', since the property type of '_id'
  // has been modified.
  // The initial schemaVersion is 0.
  schemaVersion: 3,
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjects = oldRealm.objects(User);
      const newObjects = newRealm.objects(User);
      // loop through all objects and set the _id property
      // in the new schema
      for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(config);
