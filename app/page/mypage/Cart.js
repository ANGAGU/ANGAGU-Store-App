// react import
import React, {useEffect, useState} from 'react';

// lib import
import styled from 'styled-components/native';

// local import
import {screenWidth} from '../../util/dimension';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import ep1 from '../../asset/img/example_product_1.webp'
import ep2 from '../../asset/img/example_product_2.webp'

// local API
import Auth from '../../api/authCheck'

// local Components
import Header from '../../component/organization/Header';
import Footer from '../../component/organization/Footer';
import { getOrder } from '../../api/order/order';

// react HTML
const OrderList = ({navigation, route}) => {
  // variables

  const [isLoading, setIsLoading] = useState(false)
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const Loading = async () => {
      // const result = await getOrder();
      // console.log(result);
      // setOrderList(result.data);
      const result = await Auth();
      setAuth(result);
      console.log(result)
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
            <>
              <LoginInfo>장바구니에 상품이 없습니다.</LoginInfo>
              <LoginButton textColor={"#fefefe"} onPress={() => {navigation.navigate("ProductList")}}>상품 보러 가기</LoginButton>
            </>
          
          
          
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
const ProductButton = styled(ButtonWithText)`
  margin-top: 20px;
  border: 1px solid #35BCD6;
  padding: 10px 20px;
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
const OrderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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