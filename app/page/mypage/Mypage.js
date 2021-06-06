import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert, Button } from 'react-native';
import Footer from '../../component/organization/Footer';
// icon
import IconLogin from '../../asset/icon/icon_login.png';
import IconOrder from '../../asset/icon/icon_order2.png';
import IconSearch from '../../asset/icon/icon_search.png';
import IconCart from '../../asset/icon/icon_cart.png';
import IconHome from '../../asset/icon/icon_home.png';
import IconMypage from '../../asset/icon/icon_mypage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAddress, getDefaultAddress } from '../../api/address/address';
export default ({navigation, route}) => {
    const [token, setToken] = useState("")
    const [zip, setZip] = useState("")
    const [user, setUser] = useState({})
    useEffect( () => {
        setToken(AsyncStorage.getItem('token'));
    },[])
    const order = () => {
        navigation.navigate("OrderList");
    }
    const address = () => {
        navigation.navigate("AddressList",{callback: getAddressState});
    }
    const login = () => {
        navigation.navigate("SignIn");
    }
    const cart = () => {
        navigation.navigate("Cart");
    }
    const logout = async () => {
        await AsyncStorage.setItem('token', '');
        setToken(await AsyncStorage.getItem('token'));
        Alert.alert("로그아웃", "로그아웃이 정상적으로 처리되었습니다.")
        return token;
    }

    const getAddressState = async () => {
        const addressList = await getAddress();
        if (addressList.length != 0) {
            const address = await getDefaultAddress();
            
            for (let i = 0; i < addressList.data.length; i++) {
                
                if (addressList.data[i].id == address.data[0].address_id) {
                    setZip(addressList.data[i]);
                    break;
                }
            }
        }
    }

    useEffect( () => {
        (async () => {
            const token = await AsyncStorage.getItem("token")
            setToken(token);
            if (token != null && token != ""){    
                await getAddressState();
                const name = await AsyncStorage.getItem("name")
                const email = await AsyncStorage.getItem("email")
                const phone = await AsyncStorage.getItem("phone")
                setUser({
                    name,
                    email,
                    phone
                })
            }
        })()
    }, [])
    const mypageMenu = [
        {
            title: "장바구니",
            icon: IconCart,
            callback: cart,
            auth: true
        },
        {
            title: "주문관리",
            icon: IconOrder,
            callback: order,
            auth: true
        },
        {
            title: "로그아웃",
            icon: IconLogin,
            callback: logout,
            auth: true
        },

    ]
    const formatPhone = (phoneNumber) => {
        try {
            if (phoneNumber.length > 7) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4);
            else if (phoneNumber.length > 3) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) 
            else return phoneNumber;
        } catch (error) {
            return phoneNumber;
        }
    }
    return (
        <Container>
            {/* <Header navigation={navigation} title="My Page"/> */}
            <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
                <LogoText>Angagu</LogoText>
            </LogoWrapper>
            {(token == null || token == "") ?
            <LoginWrapper>
                <LoginInfo>로그인 후 이용하실 수 있는 페이지입니다.</LoginInfo>
                <LoginButton textColor={'#ffffff'} onPress={login} >로그인 </LoginButton>
            </LoginWrapper>
            :
            <>
            <InfoWrapper>
                <InfoSpaceRow>
                    <InfoTitle>
                        회원 정보
                    </InfoTitle>
                    <InfoButton onPress={()=> {navigation.navigate("AccountEdit")}}>
                        회원 정보 수정
                    </InfoButton>
                </InfoSpaceRow>
                <InfoRow>
                    <InfoLabel>
                        고객명
                    </InfoLabel>
                    <InfoValue>
                        {user.name}
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        이메일
                    </InfoLabel>
                    <InfoValue>
                        {user.email}
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        연락처
                    </InfoLabel>
                    <InfoValue>
                        {formatPhone(user.phone)}
                    </InfoValue>
                </InfoRow>
            </InfoWrapper>
            <InfoWrapper>
                <InfoSpaceRow>
                    <InfoTitle>
                        배송지 정보
                    </InfoTitle>
                    <InfoButton onPress={address}>
                        배송지 정보 수정
                    </InfoButton>
                </InfoSpaceRow>
                <InfoRow>
                    <InfoLabel>
                        수신인
                    </InfoLabel>
                    <InfoValue>
                        {zip.recipient}
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        도로명 주소
                    </InfoLabel>
                    <InfoValue>
                        {zip.road}
                    </InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>
                        상세 주소
                    </InfoLabel>
                    <InfoValue>
                        {zip.detail}
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
            </>
            }
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
    font-family: 'GmarketSansMedium';
`;
const LoginWrapper  = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const LoginButton = styled(ButtonWithText)`
    background-color: #35BCD6;
    width: 50%;
    
`
const LoginInfo = styled(Text)`
    font-size: 12px;
    margin-bottom: 20px;
    font-family: 'GmarketSansMedium';
`
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
    width: 72px;
`
const InfoValue = styled(Text)`
    font-size: 15px;
`
const InfoButton = styled(ButtonWithText)`
    align-items: center;
`