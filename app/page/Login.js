// react import
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';

// react HTML
const Login = ({ navigation }) => {
  // variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // functions
  const onLogin = () => {
    navigation.navigate('ProductList', {
        userEmail: "dummy",
        authToken: "dummyToken"
    });
  }
  return (
    <Container>
      <LogoWrapper>
        <LogoSmallText>어디 밖에 매장</LogoSmallText>
        <LogoText>안가구</LogoText>
      </LogoWrapper>
      <LoginWrapper>
        <LoginForm>
          <LoginInput
            placeholder={'이메일'}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <LoginInput
            placeholder={'비밀번호'}
            secureTextEntry
            value={password}
            textContentType={'oneTimeCode'}
            onChangeText={setPassword}
          />
          <LoginButton buttonColor='#35BCD6' textColor='#ffffff' onPress={onLogin}>
            {'로그인'}
          </LoginButton>
          <FindButton textColor='#C7C7C7' fontSize='15px' textDecoration='underline' onPress={() => {}}>
            {'로그인 정보를 잊으셨나요?'}
          </FindButton>
          <JoinButton textColor='#C7C7C7' fontSize='15px' onPress={() => {}}>
            {'새로운 안가구계정 만들기'}
          </JoinButton>
        </LoginForm>
      </LoginWrapper>
    </Container>
  );
};

export default Login;

// react CSS
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
const LogoWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const LogoText = styled.Text`
  margin-top: 5px;
  font-size: 45px;
  color: #35BCD6;
  font-weight: 800;
`
const LogoSmallText = styled.Text`
  font-size: 19.5px;
  color: #000000;
  font-weight: 500;
`
const LoginWrapper = styled.View`
  flex: 1.618;
  width: 100%;
  background-color: #ffffff;
`
const LoginForm = styled.View`
  flex: 1.618;
  justify-content: flex-start;
  align-items: center;
  width: ${screenWidth * 0.8}px;
  margin: 0 auto;
  padding-top: 40px;
  border-top-width: 1px;
  border-top-color: #C7C7C7;
`
const LoginInput = styled(Input)`
  margin-bottom: 15px;
  width: 100%;
`;
const LoginButton = styled(ButtonWithText)`
  margin-top: 5px;
  width: 100%;
`;
const FindButton = styled(ButtonWithText)`
  margin-top: 20px;
  padding: 10px 5px;

`;
const JoinButton = styled(ButtonWithText)`
  margin-top: 15px;
  padding: 10px 20px;
  border: 1px solid #C7C7C7;
  border-radius: 40px;
`;