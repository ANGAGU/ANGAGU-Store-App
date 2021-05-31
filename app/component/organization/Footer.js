// react import
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

// lib import
import styled from 'styled-components/native';
import api from '../../api/index';
// local import
import ButtonWithText from '../atom/ButtonWithText';
import Text from '../atom/Text';
import IconLogin from '../../asset/icon/icon_login.png';
import IconCart from '../../asset/icon/icon_cart.png'
import IconOrder from '../../asset/icon/icon_order2.png';
import IconSearch from '../../asset/icon/icon_search.png';
import IconHome from '../../asset/icon/icon_home.png';
import IconMypage from '../../asset/icon/icon_mypage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const Footer = ({navigation = "", route,  title = ""}) => {
    const [token, setToken] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const goLink = link => {
        navigation.navigate(link);
    };
    
    useEffect(()=> {
        initFunction = async () => {
            let t = await AsyncStorage.getItem('token');
            api.defaults.headers.common.Authorization = t;
            setToken(t);
            setIsLoading(true);
        }
        console.log(navigation)
        initFunction();
    })
    
    const menuList = [
        {
            icon: IconSearch,
            name: '검색',
            link: 'ProductList',
            auth: false
        },
        {
            icon: IconCart,
            name: '장바구니',
            link: 'Cart',
            auth: false
        },
        {
            icon: IconHome,
            name: '안가구',
            link: 'Main',
            auth: false
        },
        {
            icon: IconOrder,
            name: '주문내역',
            link: 'OrderList',
            auth: false
        },
        {
            icon: IconMypage,
            name: 'MY',
            link: 'Mypage',
            auth: false
        },
    ];
    return (
      
        <MenuWrapper>
            {isLoading && 
            <>
                {/* <Menu onPress={() => token != null && token != '' ? logout() : goLink('SignIn')}>
                    <MenuIcon source={IconLogin} />
                    <MenuText>{token != null && token != '' ? '로그아웃' : '로그인'}</MenuText>
                </Menu>   */}
                {menuList.map((item, index) => {
                    return (
                        item.auth == true && (token == null || token == '') ?
                        <View key={index}></View>
                        :
                        <Menu key={index} onPress={() => goLink(item.link)}>
                            {item.link != route.name ?
                                <MenuIcon source={item.icon} />
                            :
                                <SelectedMenuIcon source={item.icon} />
                            }
                            <MenuText style={{color: item.link != route.name ? 'black' : '#35BCD6'}}>{item.name}</MenuText>
                        </Menu>
                    );
                })}
            </>
            }
        </MenuWrapper>
    );
};
export default Footer;
const MenuWrapper = styled.View`
    flex-direction: row;
    border-top-width: 1px;
    border-top-color: #e1e1e1;
    height: 64px;
    background: #FEFEFE;
`;
const Menu = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MenuIcon = styled.Image`
    width: 24px;
    height: 24px;
    resize-mode: contain;  
    tint-color: black;
`;
const SelectedMenuIcon = styled.Image`
    width: 26px;
    height: 26px;
    resize-mode: contain;  
    tint-color: #35BCD6;
`;
const MenuText = styled(Text)`
    font-size: 10px;
    font-family: 'GmarketSansMedium';
`;

