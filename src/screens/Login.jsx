import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, View, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';
import SliderSwitch from '../ui/SliderSwitch';
import {useQuery, useRealm} from '../context/RealmContext';
import {User} from '../databases/models/User';
import {Token} from '../databases/models/Token';
// import useLogin from '../features/authentication/useLogin';

const StyledText = styled.Text`
  font-size: ${props => props.size || '15px'};
  font-weight: ${props => props.weight || 'normal'};
  color: ${props => props.color || '#000'};
`;

const Header = styled.View`
  margin: 30px 0 0 20px;
`;

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(false);

  const realm = useRealm();

  const toggleSwitch = () => {
    // realm.write(() => {
    //   realm.deleteAll();
    // });
    setIsRememberMe(previousState => !previousState);
  };

  const login = () => {
    const user = realm.objects(User).filtered('email == $0', email);

    if (user[0].password === password) {
      if (isRememberMe) {
        realm.write(() => {
          realm.create(Token, {
            content: String(Math.floor(Math.random() * 1000)),
          });
        });
      }
      setEmail('');
      setPassword('');
      setIsRememberMe(false);
      navigation.navigate('main', {email});
    }
  };

  const token = useQuery(Token);
  const user = useQuery(User);

  console.log(user);
  console.log(token);

  useEffect(() => {
    if (token.length > 0) {
      navigation.navigate('main', {email});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigation]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <Logo />
      <KeyboardAvoidingView style={{flex: 1}}>
        <Header>
          <StyledText size="48px" weight="800">
            Sign in
          </StyledText>
          <StyledText
            size="20px"
            color="#676767"
            weight="700"
            style={{
              marginTop: 15,
            }}>
            or{' '}
            <Text
              style={{color: '#2D64BC'}}
              onPress={() => navigation.navigate('signup')}>
              Join SocialJob
            </Text>
          </StyledText>
        </Header>
        <Input
          height="64px"
          width="385px"
          placeholder="Email"
          placeholderTextColor="#666"
          data={email}
          setData={setEmail}
        />
        <Input
          height="64px"
          width="385px"
          placeholder="Password"
          placeholderTextColor="#666"
          type="password"
          data={password}
          setData={setPassword}
        />

        <View style={{marginBottom: 50}}>
          <SliderSwitch
            toggleSwitch={toggleSwitch}
            isEnabled={isRememberMe}
            content="Remember me"
          />
        </View>

        <Button
          backgroundColor="#2D64BC"
          colorText="#fff"
          onHandlePress={() => login()}>
          Sign in
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
