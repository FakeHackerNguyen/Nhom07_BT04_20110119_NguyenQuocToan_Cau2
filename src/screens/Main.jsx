import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRealm} from '../context/RealmContext';
import {Token} from '../databases/models/Token';

function Main({navigation, route}) {
  const realm = useRealm();
  const {email} = route.params;

  const logout = () => {
    const toUpdate = realm.objects(Token)[0];
    if (toUpdate) {
      realm.write(() => {
        realm.delete(toUpdate);
      });
    }

    navigation.navigate('login');
  };
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
      <TouchableOpacity onPress={() => logout()}>
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
