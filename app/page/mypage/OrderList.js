// react import
import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import
import {screenWidth} from '../../util/dimension';
import ButtonWithText from '../../component/atom/ButtonWithText';
import ep1 from '../../asset/img/example_product_1.webp'
import ep2 from '../../asset/img/example_product_2.webp'

// local API


// local Components
import Header from '../../component/organization/Header';
import { getOrder } from '../../api/order/order';

// react HTML
const OrderList = ({navigation}) => {
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
  useEffect(() => {
    const Loading = async () => {
      const result = await getOrder();
      console.log(result)
      setOrderList(result.data);
      setIsLoading(true);
    }
    Loading();
  },[])
  return (
    <Container>
      <Header navigation={navigation} title="주문 목록"/>
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
      {/* <Footer navigation={navigation}/> */}
    </Container>
  );
};
export default OrderList;

// react CSS
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
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

