import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login';
import Main from './screens/Main';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  // SplashScreen.hide();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="signup"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="signup" component={SignUp} />
      </Stack.Navigator>
      {/* <Notifications /> */}
    </NavigationContainer>
  );
}
