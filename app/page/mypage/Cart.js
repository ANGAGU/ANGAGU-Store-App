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
import { delCart, getCart } from '../../api/product/cart';
import { BACKEND_ASSET_URL } from '../../api/constants';
import { Alert,  TouchableOpacity } from 'react-native';

// react HTML
const OrderList = ({navigation, route}) => {
  // variables

  const [isLoading, setIsLoading] = useState(false)
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const del = async (cartId) => {
    const result = await delCart(cartId);
    if (result.status == "success"){
      const Cart = await getCart();
      setCart(Cart.data);
      Alert.alert("삭제 완료", "해당 물품이 장바구니에서 삭제되었습니다.")
    } else {
      Alert.alert("삭제 실패", "알 수 없는 오류가 발생하였습니다.")
    }
  }
  useEffect(() => {
    const Loading = async () => {
      
      // console.log(result);
      // setOrderList(result.data);
      const result = await Auth();
      setAuth(result);
      if (result == true){
        const Cart = await getCart();
        setCart(Cart.data);
      }
        
      
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
          cart.length == 0 ?
          <LoginWrapper>
            <LoginInfo>장바구니에 상품이 없습니다.</LoginInfo>
            <LoginButton textColor={"#fefefe"} onPress={() => {navigation.navigate("ProductList")}}>상품 보러 가기</LoginButton>
          </LoginWrapper>
          :
          <CartWrapper>
            {cart.map((item, key) => {
              return (
                <CartItem key={key}>
                  <CartText>{item.create_time.split("T")[0]}에 장바구니 등록한 상품입니다.</CartText>
                  <TouchableOpacity onPress={() => {navigation.navigate("ProductDetail",{productId: item.product_id})}}>
                    <CartRow>
                      <CartImg source={{uri:`${BACKEND_ASSET_URL}/${item.thumb_url}`}}/>
                      <CartCol>
                        <CartRow>
                          <CartTitle>상품 명</CartTitle>
                          <CartData>{item.name}</CartData>
                        </CartRow>
                        <CartRow>
                          <CartTitle>가격</CartTitle>
                          <CartData>{item.price}</CartData>
                        </CartRow>
                      </CartCol>
                    </CartRow>
                  </TouchableOpacity>
                  <CartDelButton onPress={() => del(item.id)}>삭제하기</CartDelButton>
                </CartItem>
              )
            })}
          </CartWrapper>
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
  font-family: 'GmarketSansMedium';
`;
const CartWrapper = styled.ScrollView`
  flex: 1;
`;
const CartItem = styled.View`
  background-color: #fefefe;
  padding: 20px;
  margin: 10px 10px 0px;
  border: 1px solid #D7D7D7;
  border-radius: 10px;
`
const CartRow = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`
const CartCol = styled.View`
  margin-left: 20px;
`
const CartImg = styled.Image`
  resize-mode: contain;
  width: ${(screenWidth - 120) / 2}px;
  height: ${(screenWidth - 120) / 2}px;
  border: 1px solid #E7E7E7;
`
const CartTitle = styled(Text)`
  font-size: 15px;
  color: #666666;
  margin-right: 20px;
  width: 60px;
  
`
const CartText = styled(Text)`
  color: #666666;
  
  margin-bottom: 20px;
`
const CartDelButton = styled(ButtonWithText)`
  margin-top: 10px;
  border: 1px solid #35BCD6;
`
const CartData = styled(Text)`
  font-size: 16px;
`
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
    font-family: 'GmarketSansMedium';
    margin-bottom: 20px;
`