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
import {screenWidth} from '../../util/dimension';
import Input from '../../component/atom/Input';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import Header from '../../component/organization/Header';
import Postcode from '@actbase/react-daum-postcode';

// local API
import createOrder from "../../api/order/createOrder";
import InputWithText from '../../component/atom/InputWithText';
import { getProduct } from '../../api/product/product';
import { getAddress, getDefaultAddress } from '../../api/address/address';
// example Image
// react HTML
const ProductPayment = ({ navigation, route }) => {
    const [zip, setZip] = useState(null)
    const [productCount, setProductCount] = useState(1);
    const [productInfo, setProductInfo] = useState(
        {
            id: 1,
            // brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6',
            delivery_charge: 5000
        },
    )
    const onOrder = async () => {
        // await createOrder(productInfo.id);
        const { name, price, delivery_charge } = productInfo;
        navigation.navigate("Payment",{
            name,
            // price: (price + delivery_charge) * productCount,
            price: 100,
            address: zip.roadAddress,
            postcode: zip.zonecode
        });
    }
    const getAddressState = async () => {
        setProductCount(route.params.productCount);
        const productObject = await getProduct(route.params.productId);
        setProductInfo(productObject.data);
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
            await getAddressState();
        })()
    }, [])
    return (
        <Container>
            <Header navigation={navigation} title="상품 결제"/>
            <OrderBox>
                <DeliveryWrapper>
                    <TitleWrapper>
                        <Title>배송지 정보</Title>
                        <EditButton onPress={() => {navigation.navigate("AddressList", {callback: getAddressState})}}>수정</EditButton>
                    </TitleWrapper>
                    {/* <PostContainer
                        jsOptions={{ animated: true }}
                        onSelected={data => console.log(data)}
                    /> */}
                    <AddressWrapper>
                        {zip == null ? 
                            <AddressRoad>주소지를 등록해주세요.</AddressRoad>
                        :
                            <>
                                <AddressName>{zip.recipient}</AddressName>
                                <AddressRoad>{zip.road}, {zip.detail}</AddressRoad>
                            </>
                        }
                    </AddressWrapper>
                </DeliveryWrapper>
                <PaymentWrapper>
                    <Title>상품 정보</Title>
                    <Data>
                        <DataLabel>{productInfo.name}</DataLabel>
                        <DataValue>{productCount} 개</DataValue>
                    </Data>
                </PaymentWrapper>
                <PaymentWrapper>
                    <Title>결제 정보</Title>
                    <Data>
                        <DataLabel>{productInfo.name} * {productCount}개</DataLabel>
                        <DataValue>{(productInfo.price * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</DataValue>
                    </Data>
                    <Data>
                        <DataLabel>배송 비용</DataLabel>
                        <DataValue>{(productInfo.delivery_charge * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</DataValue>
                    </Data>
                    <Result>
                        <ResultLabel>총 결제 금액</ResultLabel>
                        <ResultValue>{((productInfo.price + productInfo.delivery_charge) * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</ResultValue>
                    </Result>
                </PaymentWrapper>
                
            </OrderBox>
            <PurchaseButton
                    buttonColor={zip ? "#35BCD6" : "#E1E1E1"}
                    textColor="#ffffff"
                    onPress={onOrder}
                >
                    {'결제하기'}
            </PurchaseButton>
        </Container>
    )
}
const Container = styled.View`
    background-color: #EEEEEE;
    flex: 1;
`;
const OrderBox = styled.ScrollView`
    flex: 1;
    background-color: #EEEEEE;
    padding: 10px;
`
const TitleWrapper = styled.View`
    
    flex-direction: row;
    justify-content: space-between;
`
const EditButton = styled(ButtonWithText)`
    
`
const Title = styled(Text)`
    font-size: 16px;
    margin: 20px 0px 20px;
`
const PostContainer  = styled(Postcode)`
    width: 100%;
    height: 400px;
`
const DeliveryWrapper = styled.View`
    padding: 0px 20px;
    background-color: #FEFEFE;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const DeliveryInput = styled(Input)`
    margin-bottom: 15px;
    width: 100%;
`;
const PaymentWrapper = styled.View`
    margin-top: 12px;
    padding: 0px 20px 15px;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    background-color: #FEFEFE;
`

const PurchaseButton = styled(ButtonWithText)`
    height: 45px;
    border-radius: 5px;
    margin: 10px;
`
const Data = styled.View`
    flex-direction: row;
    margin: 0px 0px 5px;
`
const Result = styled.View`
    flex-direction: row;
    border-top-width: 1px;
    border-top-color: #C7C7C7;
    margin: 10px 0px 5px;
    padding: 15px 0px 0px;
`
const DataLabel = styled(Text)`
    flex: 1;
    font-size: 14px;
    font-weight: 600;
`
const DataValue = styled(Text)`
    flex: 1;
    text-align: right;
    font-size: 13px;
    color: #777777;
`
const ResultLabel = styled(Text)`
    flex: 1;
    font-size: 16px;
    font-weight: 600;
`
const ResultValue = styled(Text)`
    flex: 1;
    text-align: right;
    font-size: 16px;
    font-weight: 700;
    color: #E77777;
`
const AddressRoad = styled(Text)`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #777777;
`
const AddressName = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333333;
`
const AddressWrapper = styled.View`
    margin-bottom: 10px;
`

export default ProductPayment;