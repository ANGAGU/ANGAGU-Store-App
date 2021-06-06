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
import { getQna } from '../../api/product/qna';
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
  const [qna, setQna] = useState([]);
  const callback = async () => {
    const result = await getQna(route.params.productId);
    console.log(result.data);
    setQna(result.data);
  }
  useEffect(() => {
    const Loading = async () => {
        // login check
        const temp = await Auth();
        setAuth(temp);
        
        const result = await getQna(route.params.productId);
        console.log(result.data);
        setQna(result.data);
        setIsLoading(true);
    }
    Loading();
  },[])
  return (
    <Container>
        <Header navigation={navigation} title="상품 문의"/>
        {isLoading && 
        <>
            {qna.length != 0 ?
            <QnaWrapper>
                {qna.reverse().map((item, index) => {
                    return (
                        <QuestionBox key={index}>
                            <QuestionDate>[{item.create_time.split("T")[0]}] 에 등록된 문의글 입니다.</QuestionDate>
                            <QuestionTitle>
                                Q) {item.content}        
                            </QuestionTitle>
                            <QuestionBody>
                                A) {item.answer == null ? `답변 등록 대기중입니다.` : item.answer}       
                            </QuestionBody>
                        </QuestionBox>
                    )
                })}
            </QnaWrapper>
            :
            <Announce>
                <AnnounceText>
                    {`등록 된 상품 문의가 없습니다.`}
                </AnnounceText>
            </Announce>    
            }
        </>
        }
        {auth && 
            <QuestionButton onPress={() => {navigation.navigate("QnaAdd", {productId: route.params.productId, callback: callback})}}>
                상품 문의하기
            </QuestionButton>
        }
    </Container>
  );
};
export default OrderList;

// react CSS
const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;
const QnaWrapper = styled.ScrollView`

`
const QuestionBox = styled.View`
    margin-bottom: 10px;
    padding: 20px;
    background-color: #fefefe;
`
const QuestionDate = styled(Text)`
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
`
const QuestionTitle = styled(Text)`
    font-size: 16px;
    color: #101010;
    margin-bottom: 10px;
`
const QuestionBody = styled(Text)`
    font-size: 12px;
    color: #666666;
`
const QuestionButton = styled(ButtonWithText)`
    margin: 20px 20px;
    border: 1px solid #35BCD6;
`
const Announce = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const AnnounceText = styled(Text)`
  font-size: 12px;
  font-family: 'GmarketSansMedium';
  margin-bottom: 20px;
`
