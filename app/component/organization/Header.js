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
      <BackButton onPress={goBack}>{"<"}</BackButton>
      <LogoWrapper>
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
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
`;
const LogoWrapper = styled(ButtonWithText)`
    flex: 1;
`;
const BackButton = styled(ButtonWithText)`
    width: 60px;
`;

const SearchWrapper = styled.View``;
export default Header;
