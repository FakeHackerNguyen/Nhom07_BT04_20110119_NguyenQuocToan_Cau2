import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import config, {RealmProvider, User} from './src/databases/models/User';
import {createRealmContext} from '@realm/react';

const AppWrapper = () => {
  return (
    <RealmProvider schema={[User]}>
      <App />
    </RealmProvider>
  );
};
AppRegistry.registerComponent(appName, () => AppWrapper);
