// react import
import React, { useEffect, useState } from 'react';
import {
    FlatList,   
    ScrollView,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';
import Text from '../component/atom/Text';
import Header from '../component/organization/Header';

// local API
import createOrder from "../api/order/createOrder";
// example Image
import ep1 from '../asset/img/example_product_1.webp';

// react HTML
const ProductPayment = ({ navigation, route }) => {
    const [productInfo, setProductInfo] = useState(
        {
            id: 1,
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
    )
    const onOrder = async () => {
        // await createOrder(productInfo.id);
        navigation.navigate("Main");
    }
    
    return (
        <Container>
            <Header navigation={navigation} title="뒤로가기"/>
            <OrderBox>
                <DeliveryWrapper>
                    <Title>배송지 정보</Title>
                    <DeliveryInput
                        placeholder={'받는 사람'}
                        autoCapitalize="none"
                    />
                    <DeliveryInput
                        placeholder={'도로명 주소'}
                        autoCapitalize="none"
                    />
                    <DeliveryInput
                        placeholder={'상세 주소'}
                        autoCapitalize="none"
                    />
                    <DeliveryInput
                        placeholder={'배송요청사항'}
                        autoCapitalize="none"
                    />
                </DeliveryWrapper>
                <PaymentWrapper>
                    <Title>결제 정보</Title>
                    <Data>
                        <DataLabel>상품 명</DataLabel>
                        <DataValue>{productInfo.name}</DataValue>
                    </Data>
                    <Data>
                        <DataLabel>총 금액</DataLabel>
                        <DataValue>{productInfo.price}</DataValue>
                    </Data>
                
                </PaymentWrapper>
                <PurchaseButton
                    buttonColor="#35BCD6"
                    textColor="#ffffff"
                    onPress={onOrder}
                >
                    {'결제하기'}
                </PurchaseButton>
            </OrderBox>
        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const OrderBox = styled.ScrollView`
    flex: 1;
    padding: 20px;
`
const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    margin: 20px 0px;
`
const DeliveryWrapper = styled.View`
`
const DeliveryInput = styled(Input)`
  margin-bottom: 15px;
  width: 100%;
`;
const PaymentWrapper = styled.View`
    
`

const PurchaseButton = styled(ButtonWithText)`
    height: 45px;
    border-radius: 5px;
    margin-top: 20px;
`
const Data = styled.View`
    flex-direction: row;
    margin: 10px 0px;
`
const DataLabel = styled.Text`
    flex: 1;
    font-size: 16px;
    font-weight: 600;
`
const DataValue = styled.Text`
    flex: 1;
    font-size: 16px;
`
export default ProductPayment;