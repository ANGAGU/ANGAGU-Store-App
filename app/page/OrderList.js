// react import
import React, {useEffect, useState} from 'react';
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

// local API
import login from '../api/auth/login';
import Header from '../component/organization/Header';

// react HTML
const OrderList = ({navigation}) => {
  // variables

  return (
    <Container>
      <Header/>
    </Container>
  );
};

export default OrderList;

// react CSS
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;