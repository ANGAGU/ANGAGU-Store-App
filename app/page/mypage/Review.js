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
import { BACKEND_ASSET_URL } from '../../api/constants';

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
      const temp = await Auth();
      setAuth(temp);
      if (temp == true) {
        // const result = await getOrder();
        // setOrderList(result.data.reverse());
        setIsLoading(true);
      }
    }
    Loading();
  },[])
  return (
    <Container>
        <Header navigation={navigation} title="상품 리뷰"/>
        {isLoading ? 
            <>
            </>
        :
            <>
            </>
        }

        {/* <Footer navigation={navigation} route={route}/> */}
    </Container>
  );
};
export default OrderList;

// react CSS
const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;
