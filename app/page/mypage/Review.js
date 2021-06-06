// react import
import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';
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
  const [review, setReview] = useState([]);
  useEffect(() => {
    const Loading = async () => {
      setReview(route.params.review);
      console.log(route.params.review);
    }
    Loading();
  },[])
  return (
    <Container>
        <Header navigation={navigation} title="구매 후기"/>
        {review.length != 0 ? 
            <ReviewWrapper>
              {review.map((item, index) => {
                return (
                <ReviewBox key={index}>
                  <ReviewRow>
                    <ReviewTitle>{item.name}</ReviewTitle>
                    <ReviewRow>
                      <Stars
                          display={item.star}
                          spacing={0.5}
                          count={5}
                          starSize={10}
                          fullStar= {require('../../asset/img/star_full.png')}
                          emptyStar= {require('../../asset/img/star_empty.png')}
                      />    
                      <ReviewSub>{item.update_time.split("T")[0]}</ReviewSub>
                    </ReviewRow>
                  </ReviewRow>
                  <ReviewContent>{item.content}</ReviewContent>
                </ReviewBox>
                )
              })}
              <Announce>
                <AnnounceText>
                  구매 후기는 상품을 구매 한 후, 주문 목록에서 작성하실 수 있습니다.
                </AnnounceText>
              </Announce>
            </ReviewWrapper>
        :
            <Announce>
              <AnnounceText>
                등록 된 구매 후기가 없습니다.
              </AnnounceText>
            </Announce>
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
const ReviewWrapper = styled.ScrollView`
  
`
const ReviewBox = styled.View`
  background-color: #FEFEFE;
  margin-bottom: 10px;
  padding: 20px;
` 
const ReviewRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const ReviewTitle = styled(Text)`
  font-size: 15px;
  color: #666666;
`
const ReviewContent = styled(Text)`
  font-size: 16px;
  color: #101010;
  margin-top: 5px;
`
const ReviewSub = styled(Text)`
  font-size: 11px;
  color: #888888;
  margin-left: 5px;
`

const Announce = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 10px;
`
const AnnounceText = styled(Text)`
  font-size: 12px;
  font-family: 'GmarketSansMedium';
  margin-bottom: 20px;
`