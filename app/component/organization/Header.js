// react import
import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import
import ButtonWithText from '../atom/ButtonWithText';

const Header = ({navigation, title}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <LogoWrapper>
        <BackButton onPress={goBack}>{title}</BackButton>
      </LogoWrapper>
      <SearchWrapper></SearchWrapper>
    </Container>
  );
};

const Container = styled.View`
  height: 60px;
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
`;
const LogoWrapper = styled.View``;
const BackButton = styled(ButtonWithText)``;

const SearchWrapper = styled.View``;
export default Header;
