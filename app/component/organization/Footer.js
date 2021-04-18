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
import IconLogin from '../../asset/icon/icon_login.png'
import IconOrder from '../../asset/icon/icon_order.png'
import IconSearch from '../../asset/icon/icon_search.png'

const Footer = ({navigation, title}) => {
  const goLink = (link) => {
    navigation.navigate(link);
  };
  const menuList = [
    {
        icon: IconLogin,
        name: "로그인",
        link: "Login"
    },
    {
        icon: IconSearch,
        name: "검색",
        link: "ProductList"
    },
    {
        icon: IconOrder,
        name: "주문목록",
        link: "OrderList"
    },
]
  return (
    <MenuWrapper>
    {
        menuList.map((item, index) => {
            return (
                <Menu key={index} onPress={() => goLink(item.link)}>
                    <MenuIcon source={item.icon}/>
                    <MenuText>{item.name}</MenuText>
                </Menu>
            );
        })
    }
    </MenuWrapper>
  );
};
const MenuWrapper = styled.View`
    flex-direction: row;
    height: 80px;
    margin-bottom: 10px;
`
const Menu = styled(TouchableOpacity)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const MenuIcon = styled.Image`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`
const MenuText = styled.Text`
    font-weight: 700;
`
export default Footer;
