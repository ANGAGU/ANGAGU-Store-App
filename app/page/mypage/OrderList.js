// react import
import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import
import {screenWidth} from '../../util/dimension';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import ep1 from '../../asset/img/example_product_1.webp'
import ep2 from '../../asset/img/example_product_2.webp'

// local API


// local Components
import Header from '../../component/organization/Header';
import Footer from '../../component/organization/Footer';
import { getOrder } from '../../api/order/order';
import Auth from '../../api/authCheck.js'
// react HTML
const OrderList = ({navigation, route}) => {
  // variables

  const [orderList, setOrderList] = useState([
    {
      id: 1,
      image: ep1,
      brand: 'SVENBERTIL',
      name: '스벤베르틸 의자',
      price: 49900,
      state: '배송 중',
      createdAt: '2021-04-18'
  },
  {
      id: 2,
      image: ep2,
      brand: 'LEIFARNE',
      name: '레이파르네 팔걸이의자',
      price: 69900,
      createdAt: '2021-04-16',
      state: '배송 완료'
  },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const Loading = async () => {
      const result = await getOrder();

      setOrderList(result.data);
      setIsLoading(true);
    }
    Loading();
  },[])
  return (
    <Container>
      {/* <Header navigation={navigation} title="주문 목록"/> */}
      <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
          <LogoText>Angagu</LogoText>
      </LogoWrapper>
      {auth ? 
      <OrderWrapper>
          {isLoading && orderList.map((order, index) => {
            return (
              <OrderItem key={index}>
                <OrderImage source={ep1}/>
                <OrderInfo>
                  <OrderName>{order.name}</OrderName>
                  <OrderPrice>￦ {order.price.toLocaleString()}</OrderPrice>
                  <OrderState>{order.state}</OrderState>
                </OrderInfo>
                <OrderButtonWrapper>
                  
                </OrderButtonWrapper>
              </OrderItem>
            );
          })}
      </OrderWrapper>
      :
        <LoginWrapper>
          <LoginInfo>로그인 후 이용하실 수 있는 페이지입니다.</LoginInfo>
          <LoginButton textColor={"#fefefe"} onPress={() => {navigation.navigate("SignIn")}} >로그인 </LoginButton>
        </LoginWrapper>
      }
      <Footer navigation={navigation} route={route}/>
    </Container>
  );
};
export default OrderList;

// react CSS
const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;
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
const OrderWrapper = styled.ScrollView`
  flex: 1;
  
`;
const OrderItem = styled.View`
  flex-direction: row;
  width: ${(screenWidth)}px;
  margin: 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #E7E7E7;
`
const OrderInfo = styled.View`

`
const OrderBrand = styled.Text`
  font-weight: 700;
  margin: 5px;
`
const OrderName = styled.Text`
  margin: 5px;
`
const OrderPrice = styled.Text`
  margin: 5px;
`
const OrderState = styled.Text`
  font-size: 20px;
  margin: 10px 5px;
`
const OrderImage = styled.Image`
  resize-mode: contain;
  width: ${(screenWidth - 120) / 3}px;
  height: ${(screenWidth - 120) / 3}px;
`
const OrderButtonWrapper = styled.View`
  flex-direction: row;
`
const ReviewButton = styled(ButtonWithText)`
`

const LoginWrapper  = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const LoginButton = styled(ButtonWithText)`
    background-color: #35BCD6;
    width: 66%;
    
`
const LoginInfo = styled(Text)`
    font-size: 12px;
    margin-bottom: 20px;
`