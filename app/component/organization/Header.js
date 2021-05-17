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
import BackIcon from '../../asset/icon/icon_back_alt2.png'
const Header = ({navigation, title}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BackButton imageMode={true} onPress={goBack}>
        <Icon source={BackIcon}/>
      </BackButton>
      <LogoWrapper textColor="#000000" fontWeight='1000'>
        {title}
      </LogoWrapper>
      <SearchWrapper></SearchWrapper>
      <BackButton/>
    </Container>
  );
};

const Container = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #D7D7D7;
`;
const Icon = styled.Image`
  height: 16px;
  width: 16px;
  padding-top: 1px;
  resize-mode: contain;
`
const LogoWrapper = styled(ButtonWithText)`
  flex: 1;
`;
const BackButton = styled(ButtonWithText)`
  width: 60px;
`;

const SearchWrapper = styled.View``;
export default Header;
