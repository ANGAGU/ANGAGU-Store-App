import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert } from 'react-native';
import Footer from '../../component/organization/Footer';
// icon
import IconLogin from '../../asset/icon/icon_login.png';
import IconOrder from '../../asset/icon/icon_order.png';
import IconSearch from '../../asset/icon/icon_search.png';
import IconHome from '../../asset/icon/icon_home.png';
import IconMypage from '../../asset/icon/icon_mypage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default ({navigation, route}) => {
    const order = () => {
        navigation.navigate("OrderList");
    }
    const qna = () => {
        navigation.navigate("OrderList");
    }
    const login = () => {
        navigation.navigate("SignIn");
    }
    const logout = async () => {
        await AsyncStorage.setItem('token', '');
        setToken(await AsyncStorage.getItem('token'));
        Alert.alert("로그아웃", "로그아웃이 정상적으로 처리되었습니다.")
        return token;
    }
    const mypageMenu = [
        {
            title: "주문관리",
            icon: IconOrder,
            callback: order,
        },
        {
            title: "문의관리",
            icon: IconLogin,
            callback: qna,
        },
        {
            title: "로그아웃",
            icon: IconLogin,
            callback: logout,
        },

    ]
    return (
        <Container>
            {/* <Header navigation={navigation} title="My Page"/> */}
            <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
                <LogoText>Angagu</LogoText>
            </LogoWrapper>
            <FormWrapper>
                
                {mypageMenu.map( (menu, key) => {
                    return (
                        <FormRow key={key}>
                            <FormIcon source={menu.icon}/>
                            <FormButton innerStyle={{fontSize: 15}}textColor="#000000">{menu.title}</FormButton>
                        </FormRow>
                    )
                })}
            </FormWrapper>
            <Footer navigation={navigation} route={route}/>
        </Container>
    )
}

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

const FormWrapper = styled.ScrollView`
    padding: 0px 0px 0px;
`
const FormRow = styled.View`
    flex-direction : row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
    padding: 8px 16px;
    
`
const FormIcon = styled.Image`
    width: 24px;
    height: 24px;
    margin-right: 16px;
    resize-mode: contain;
`
const FormButton = styled(ButtonWithText)`
    alignItems: flex-start;
`
const LogoWrapper = styled.View`
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
`;
const LogoText = styled(Text)`
    margin-top: 5px;
    font-size: 22px;
    color: #35bcd6;
    font-weight: 800;
`;