import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {RealmProvider} from './src/context/RealmContext';
import {User} from './src/databases/models/User';

const AppWrapper = () => {
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
};
AppRegistry.registerComponent(appName, () => AppWrapper);
