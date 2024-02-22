import {createRealmContext} from '@realm/react';
import Realm from 'realm';

import {User} from '../databases/models/User';
import {Token} from '../databases/models/Token';

const config = {
  schema: [User, Token],
  // Increment the 'schemaVersion', since the property type of '_id'
  // has been modified.
  // The initial schemaVersion is 0.
  schemaVersion: 5,
  onMigration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 1) {
      const oldObjectsUser = oldRealm.objects(User);
      const newObjectsUser = newRealm.objects(User);
      // loop through all objects and set the _id property
      // in the new schema
      for (const objectIndex in oldObjectsUser) {
        const oldObject = oldObjectsUser[objectIndex];
        const newObject = newObjectsUser[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }

      const oldObjectsToken = oldRealm.objects(Token);
      const newObjectsToken = newRealm.objects(Token);
      // loop through all objects and set the _id property
      // in the new schema
      for (const objectIndex in oldObjectsToken) {
        const oldObject = oldObjectsToken[objectIndex];
        const newObject = newObjectsToken[objectIndex];
        newObject._id = new Realm.BSON.ObjectId(oldObject._id);
      }
    }
  },
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(config);
