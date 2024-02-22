import {useRealm} from '@realm/react';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// import useLogin from '../features/authentication/useLogin';
// import Spinner from '../ui/Spinner';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({navigation}) {
  // const {handleLogout, isLoading, navigation} = useLogin();

  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Welcome to Main
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
      {/* replace current screen with login */}
    </View>
  );
}

export default Main;
