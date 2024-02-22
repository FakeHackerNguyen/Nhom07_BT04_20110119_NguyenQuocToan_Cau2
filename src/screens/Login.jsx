import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Linking,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';

import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';
import {User, useQuery, useRealm} from '../databases/models/User';
import SliderSwitch from '../ui/SliderSwitch';
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [isFillPassword, setIsFillPassword] = useState(false);

  const realm = useRealm();
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    // update the user's data
  };

  const toggleSwitchFillPassword = () => {
    setIsFillPassword(previousState => !previousState);
    // fill password if isRemember is true from realm
    if (!isFillPassword) {
      const toUpdateUser = realm.objects('User').filtered('email = $0', email);
      if (toUpdateUser[0].isRemember) {
        setPassword(toUpdateUser[0].password);
      } else {
        Alert.alert(
          'Fill password',
          'Please remember password first and login. Then when you login for later, you can use this function',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
        setIsFillPassword(false);
        setIsEnabled(false);
      }
    } else {
      setPassword('');
    }
  };

  const login = () => {
    const toUpdateUser = realm.objects('User').filtered('email = $0', email);

    // check email and password
    if (
      toUpdateUser[0].email === email &&
      toUpdateUser[0].password === password
    ) {
      realm.write(() => {
        toUpdateUser[0].isRemember = isEnabled;
      });
      // navigate to home
      navigation.navigate('main');
    } else {
      // show error message
      console.log('Invalid email or password');
    }
    setEmail('');
    setPassword('');
    setIsEnabled(false);
    setIsFillPassword(false);
  };

  const user = useQuery(User);
  console.log(user);

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
            isEnabled={isEnabled}
            content="Remember me"
          />
          <SliderSwitch
            toggleSwitch={toggleSwitchFillPassword}
            isEnabled={isFillPassword}
            content="Fill password"
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
