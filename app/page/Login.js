
import React from 'react';
import styled from 'styled-components/native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Container>
      <Text>Hello, World!</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Login;
