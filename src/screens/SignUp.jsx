import React, {useState} from 'react';
import {SafeAreaView, View, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';
import {User, useRealm} from '../databases/models/User';
// import useLogin from '../features/authentication/useLogin';

const StyledText = styled.Text`
  font-size: ${props => props.size || '15px'};
  font-weight: ${props => props.weight || 'normal'};
  color: ${props => props.color || '#000'};
`;

const Header = styled.View`
  margin: 30px 0 0 20px;
`;

export default function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const realm = useRealm();

  function signUp() {
    realm.write(() => {
      realm.create(User, {
        _id: Math.floor(Math.random() * 1000000),
        email: email,
        password: password,
        isRemember: false,
      });
    });
  }

  function deleteAll() {
    realm.write(() => {
      realm.deleteAll();
    });
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <KeyboardAvoidingView style={{flex: 1}}>
        <Header>
          <StyledText size="48px" weight="800">
            Sign up
          </StyledText>
        </Header>
        <Input
          data={email}
          setData={setEmail}
          height="64px"
          width="385px"
          placeholder="Email"
          placeholderTextColor="#666"
        />
        <Input
          data={password}
          setData={setPassword}
          height="64px"
          width="385px"
          placeholder="Password"
          placeholderTextColor="#666"
          type="password"
        />
        <View style={{marginBottom: 50}}></View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() => {
            signUp();
            navigation.navigate('login');
          }}>
          Sign up
        </Button>
        <View style={{marginBottom: 50}}></View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() => deleteAll()}>
          Delete all user
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
