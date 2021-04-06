/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import styled from 'styled-components/native';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <Container>
        <TopView/>
        <Logo>
          <LogoMediumText>어디 밖에 매장</LogoMediumText>
          <LogoText>안가구</LogoText>
          {/* <LogoSmallText>오픈마켓 가구 AR</LogoSmallText> */}
        </Logo>
        <BotView/>
        <StatusBar hidden={false} backgroundColor='#35BCD6'/>    
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #35BCD6;
`;
const TopView = styled.View` flex: 0.92;`
const BotView = styled.View` flex: 1;`
const Logo = styled.View`
  justify-content: center;
  align-items: center;
`
const LogoText = styled.Text`
  font-size: 60px;
  color: #ffffff;
  font-weight: 800;
`
const LogoMediumText = styled.Text`
  font-size: 25px;
  color: #ffffff;
  font-weight: 600;
`
const LogoSmallText = styled.Text`
  margin-top: 5px;
  font-size: 20px;
  color: #ffffff;
  font-weight: 600;
`

export default App;
