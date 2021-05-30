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
    const [token, setToken] = useState("")
    useEffect( () => {
        setToken(AsyncStorage.getItem('token'));
    },[])
    const order = () => {
        navigation.navigate("OrderList");
    }
    const qna = () => {
        navigation.navigate("AddressList",{callback: () => {}});
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
            auth: true
        },
        {
            title: "배송지 관리",
            icon: IconLogin,
            callback: qna,
            auth: true
        },
        {
            title: "로그인",
            icon: IconLogin,
            callback: login,
            auth: false
        },
        {
            title: "로그아웃",
            icon: IconLogin,
            callback: logout,
            auth: true
        },

    ]
    return (
        <Container>
            {/* <Header navigation={navigation} title="My Page"/> */}
            <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
                <LogoText>Angagu</LogoText>
            </LogoWrapper>
            <InfoWrapper>
                <InfoSpaceRow>
                    <InfoTitle>
                        회원 정보
                    </InfoTitle>
                    <InfoButton>
                        회원 정보 수정
                    </InfoButton>
                </InfoSpaceRow>
                <InfoRow>
                    <InfoLabel>
                        고객명
                    </InfoLabel>
                    <InfoValue>
                        이준호
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        이메일
                    </InfoLabel>
                    <InfoValue>
                        leejunho@ajou.ac.kr
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        연락처
                    </InfoLabel>
                    <InfoValue>
                        010-2576-7806
                    </InfoValue>
                </InfoRow>
            </InfoWrapper>
            <FormWrapper>
                {/* <FormTitle>
                    메뉴
                </FormTitle> */}
                {mypageMenu.map( (menu, key) => {
                    return (
                        menu.auth == true && (token != null && token != "") ?
                        <FormRow imageMode={true} onPress={menu.callback} key={key}>
                            <FormIcon source={menu.icon}/>
                            <FormButton>{menu.title}</FormButton>
                        </FormRow>
                        :
                        menu.auth == false && (token == null || token == "") &&
                        <FormRow onPress={menu.callback} key={key}>
                            <FormIcon source={menu.icon}/>
                            <FormButton>{menu.title}</FormButton>
                        </FormRow>
                    )
                })}
            </FormWrapper>
            <Footer navigation={navigation} route={route}/>
        </Container>
    )
}

const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;

const FormWrapper = styled.ScrollView`
    
`
const FormRow = styled(ButtonWithText)`
    flex-direction : row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
    height: 60px;
    justify-content: flex-start;
    
    padding: 10px 20px;
`
const FormTitle = styled(Text)`
    padding: 20px;
    font-size: 22px;
`

const FormIcon = styled.Image`
    width: 24px;
    height: 24px;
    margin-right: 16px;
    resize-mode: contain;
`
const FormButton = styled(Text)`
    alignItems: flex-start;
    color: #333333;
    font-size: 15px;
`
const LogoWrapper = styled.View`
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
    background-color: #fefefe;
`;
const LogoText = styled(Text)`
    margin-top: 5px;
    font-size: 22px;
    color: #35bcd6;
    font-weight: 800;
`;

const InfoWrapper = styled.View`
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
    margin-bottom: 8px;
    background-color: #fefefe;
`
const InfoTitle = styled(Text)`
    font-size: 22px;
    margin-bottom: 10px;
`
const InfoRow = styled.View`
    flex-direction: row;
    padding: 5px 0px;
    align-items: center;
`
const InfoSpaceRow = styled.View`
    flex-direction: row;
    padding: 0px;
    align-items: center;
    justify-content: space-between;
`
const InfoLabel = styled(Text)`
    font-size: 14px;
    color: #888888;
    margin-right: 10px;
    
`
const InfoValue = styled(Text)`
    font-size: 15px;
`
const InfoButton = styled(ButtonWithText)`
    align-items: center;
`