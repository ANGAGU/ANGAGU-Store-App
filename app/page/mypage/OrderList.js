// react import
import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import
import {screenWidth} from '../../util/dimension';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import ep1 from '../../asset/img/example_product_1.webp'
import ep2 from '../../asset/img/example_product_2.webp'

// local API
import { BACKEND_ASSET_URL } from '../../api/constants';

// local Components
import Header from '../../component/organization/Header';
import Footer from '../../component/organization/Footer';
import { getOrder, refund } from '../../api/order/order';
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
      const temp = await Auth();
      setAuth(temp);
      if (temp == true) {
        const result = await getOrder();
        setOrderList(result.data.reverse());
        setIsLoading(true);
      }
    }
    Loading();
  },[])
  const review = (id) => {

    navigation.navigate("ReviewAdd", {orderId: id, type: "add", callback: reviewCallback})
  }
  const reviewEdit = (id) => {
    navigation.navigate("ReviewAdd", {orderId: id, type: "edit", callback: reviewCallback})
  }
  const reviewCallback = async () => {
    const result = await getOrder();
    setOrderList(result.data.reverse());
    setIsLoading(true);
  }
  const refundFnc = async (id) => {
    await refund(id, "소비자 단순 변심")
    const result = await getOrder();
    setOrderList(result.data.reverse());
    Alert.alert("환불 요청이 완료되었습니다.");
  }
  return (
    <Container>
      {/* <Header navigation={navigation} title="주문 목록"/> */}
      <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
          <LogoText>Angagu</LogoText>
      </LogoWrapper>
      {auth ? 
      isLoading && orderList.length == 0 ?
        <LoginWrapper>
          <LoginInfo>주문 내역이 없습니다.</LoginInfo>
          <LoginButton textColor={"#fefefe"} onPress={() => {navigation.navigate("ProductList")}}>상품 보러 가기</LoginButton>
        </LoginWrapper>
      :
      <OrderWrapper>
          {isLoading && orderList.map((order, index) => {
            return (
              <OrderItem key={index}>
                <OrderRow>
                  <OrderTitle>{order.create_time.split("T")[0]}</OrderTitle>
                  <OrderState>{order.delivery_number == null ? '배송 준비 중' : '배송 조회 (' + order.delivery_number + ')'}</OrderState>
                </OrderRow>
                <OrderContainer>
                  <OrderImage source={{uri:`${BACKEND_ASSET_URL}/${order.thumb_url}`}}/>
                  <OrderInfo>
                    <OrderRow>
                      <OrderLabel>주문번호</OrderLabel>
                      <OrderValue>{order.id}</OrderValue>
                    </OrderRow>
                    <OrderRow>
                      <OrderLabel>주문일자</OrderLabel>
                      <OrderValue>{order.create_time.split("T")[0]}</OrderValue>
                    </OrderRow>
                    <OrderRow>
                      <OrderLabel>상품명</OrderLabel>
                      <OrderValue>{order.name}</OrderValue>
                    </OrderRow>
                    <OrderRow>
                      <OrderLabel>개수</OrderLabel>
                      <OrderValue>{order.count}</OrderValue>
                    </OrderRow>
                    <OrderRow>
                      <OrderLabel>가격</OrderLabel>
                      <OrderValue>{order.price}</OrderValue>
                    </OrderRow>
                    
                  </OrderInfo>
                </OrderContainer>
                {order.refund_state == 0 &&
                  <OrderButtonWrapper>
                    <ReviewButton onPress={() => refundFnc(order.id)} textColor="#E77777">{ "환불 요청"}</ReviewButton>
                    <ReviewButton onPress={() => order.review_id == null ? review(order.id) : reviewEdit(order.id)} textColor="#010101">{order.review_id == null ? "구매 후기 작성" : "구매 후기 수정"}</ReviewButton>
                  </OrderButtonWrapper>
                }
                {order.refund_state == 1 &&
                  
                  <RefundInfo>
                      환불 요청 중인 상품입니다.
                  </RefundInfo>
                  
                }
                {order.refund_state == 2 &&
                  <RefundInfo>
                    환불 완료 된 상품입니다.
                  </RefundInfo>
                }
              </OrderItem>
            );
          })}
      </OrderWrapper>
      :
        <LoginWrapper>
          <LoginInfo>로그인 후 이용하실 수 있는 페이지입니다.</LoginInfo>
          <LoginButton innerStyle={"font-family: 'GmarketSansMedium'"} textColor={"#fefefe"} onPress={() => {navigation.navigate("SignIn")}} >로그인 </LoginButton>
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
    font-family: 'GmarketSansMedium';
`;
const OrderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #E1E1E1;
  padding: 10px 20px;
  margin-top: 5px;
  border-radius: 10px;
`
const OrderWrapper = styled.ScrollView`
  flex: 1;
`;
const OrderItem = styled.View`
  background-color: #fefefe;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #E7E7E7;
`
const OrderTitle = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  margin-left: 5px;
`
const OrderState = styled(Text)`
  flex: 1;
  text-align: right;
  color: #35BCD6;
  margin-right: 10px;
`
const OrderInfo = styled.View`
  padding: 20px;
`
const OrderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`
const OrderValue = styled(Text)`
  font-size: 15px;
  color: #111111;
`
const OrderLabel = styled(Text)`
  font-size: 12px;
  width: 64px;
  margin-left: 10px;
  color: #777777;
`
const OrderImage = styled.Image`
  resize-mode: contain;
  width: ${(screenWidth - 120) / 2}px;
  height: ${(screenWidth - 120) / 2}px;
`
const OrderButtonWrapper = styled.View`
  flex-direction: row;
`
const ReviewButton = styled(ButtonWithText)`
  margin-top: 10px;
  flex: 1;
  border: 1px solid #E5E5E5;
  padding: 10px;
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
const RefundInfo = styled(Text)`
  text-align: center;
  margin: 20px 0px 10px;
`