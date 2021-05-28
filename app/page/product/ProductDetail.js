// react import
import React, { useEffect, useState, useRef } from 'react';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';
import CounterInput from "react-native-counter-input";
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'


// local import 
import {screenWidth} from '../../util/dimension';
import Input from '../../component/atom/Input';
import Text from '../../component/atom/Text';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Counter from '../../component/molecule/Counter';
import Header from '../../component/organization/Header';
import { BACKEND_ASSET_URL } from '../../api/constants';
// local API
import {getProduct} from "../../api/product/product";

// example Image
import ep1 from '../../asset/img/example_product_1.webp';
// import ep4 from '../asset/img/example_product_4.jpeg';
// import epd1 from '../asset/img/example_product_description.jpeg'
import { View, Alert, Dimensions, Image, StyleSheet, Slider, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
 
// react HTML
const ProductDetail = ({ navigation, route }) => {
    const SliderWidth = Dimensions.get('screen').width;

    const [imgHeight, setImgHeight] = useState(0);
    const [token, setToken] = useState("");
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const init = async () =>{
            const productObject = await getProduct(route.params.productId);
            if (productObject.status == "success") {
                await setProductInfo(productObject.data);
                setToken(await AsyncStorage.getItem('token'));
                setLoading(true);
            }
            else
                Alert.alert('상품 정보 호출에 실패하였습니다.');            
        }
        init();
    },[])
    const [loading, setLoading] = useState(false);    
    const [productInfo, setProductInfo] = useState({

    })
    const [productCount, setProductCount] = useState(1);
    const onPurchaseClick = () => {
        setModal(false);
        if (token == '' || token == null)
            navigation.navigate('SignIn', {
                callback: route.params.productId   
            });
        else
            navigation.navigate('ProductPayment', {
                productId: route.params.productId,
                productCount: productCount
            });
    }
    const onARClick = () => {
        navigation.navigate('ARView', {
            productId: route.params.productId
        });
    }

    // const carousel = useRef(null);
    return (
        <Container>
            <Header navigation={navigation} title='상품 정보'/>
            {loading &&
            <ProductWrapper>
                <ProductImage source={{uri: BACKEND_ASSET_URL + '/' + productInfo.thumb_url}}/>
                
                <ProductInfoWrapper>
                    <ProductName>{productInfo.name}</ProductName>
                    <ProductPrice>￦ {productInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ProductPrice>
                    <ReviewWrapper>
                    
                        {/* <ProductBrand>
                            {productInfo.brand}
                        </ProductBrand> */}
                        <Stars
                            display={3.67}
                            spacing={2}
                            count={5}
                            starSize={12}
                            fullStar= {require('../../asset/img/star_full.png')}
                            emptyStar= {require('../../asset/img/star_empty.png')}
                        />    
                        <ProductDeliveryCharge>
                            배송비 {productInfo.delivery_charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                        </ProductDeliveryCharge>
                        
                    </ReviewWrapper>
                </ProductInfoWrapper>
                
                <ProductDescriptionWrapper>
                    <AutoHeightWebView
                        source={{
                            // uri: BACKEND_ASSET_URL + '/' + productInfo.description_url,
                            html: `<img width=${SliderWidth}px src="${BACKEND_ASSET_URL}/${productInfo.description_url}"/>`
                        }}
                        style={{
                            marginTop: 20,
                            width: SliderWidth
                            
                        }} 
                    />
                </ProductDescriptionWrapper>
            </ProductWrapper>    
            }
            <PurchaseWrapper>
                <PurchaseButton onPress={onARClick}>AR View</PurchaseButton>
                <PurchaseButton
                    buttonColor="#35BCD6"
                    textColor="#ffffff"
                    // onPress={onPurchaseClick}
                    onPress={() => setModal(true)}
                >
                    {'구매하기'}
                </PurchaseButton>
            </PurchaseWrapper>
            {loading &&
            <Modal
              animated
              animationType="fade"
              visible={modal}
              transparent
              onRequestClose={() => setModal(false)}
            >
                <ModalBackground>
                    <ModalHide onPress={() => setModal(false)}/>
                    <ModalView>
                        <CounterPrice>{(productInfo.price * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</CounterPrice>
                        <CounterDelivery>배송 비용 : {(productInfo.delivery_charge * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</CounterDelivery>
                        <CounterWrapper>
                            <CounterName>{productInfo.name}</CounterName>
                            <Counter value={productCount} setValue={setProductCount} min={1} max={10}/>
                        </CounterWrapper>
                        <ModalButton
                            buttonColor="#35BCD6"
                            textColor="#ffffff"
                            onPress={onPurchaseClick}
                            // onPress={() => setModal(true)}
                        >
                            {'구매하기'}
                        </ModalButton>
                    </ModalView>
                </ModalBackground>

            </Modal>
            }
        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const ProductWrapper = styled.ScrollView`
    flex: 1;
    flex-direction: column;
`
const ProductInfoWrapper = styled.View`
    flex: 1;
    margin: 20px;
    width: ${(screenWidth - 40)}px;
    flex-direction: column;
`
const ProductImage = styled.Image`
    width: ${(screenWidth)}px;
    height: ${(screenWidth)}px;
    resize-mode: contain;
`

const ProductName = styled(Text)`
    margin-top: 10px;
    font-size: 22px;
`
const ProductPrice = styled(Text)`
    margin-top: 10px;
    font-size: 16px;
`
const ProductBrand = styled(Text)`
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    color: #35BCD6;
`
const ProductDescription = styled(FastImage)`
    flex:1;
    width=${screenWidth};
`
const ProductDeliveryCharge = styled(Text)`
    margin-left: 10px;
    font-size: 12px;
`
const ProductDescriptionWrapper = styled.View`
    border-top-width: 8px;
    border-top-color: #E9E9E9;
    
`
const ReviewWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
const PurchaseButton = styled(ButtonWithText)`
    height: 48px;
    width: 49%;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const ModalButton = styled(ButtonWithText)`
    height: 48px;
    width: 100%;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const PurchaseWrapper = styled.View`
    margin: 1% 1%;
    flex-direction: row;
    justify-content: space-around;
`

const ModalBackground = styled.View`
    backgroundColor: rgba(0,0,0,0.5);
    flex: 1;
    justifyContent: flex-end;
`
const ModalView = styled.View`
    backgroundColor: #FEFEFE;
    padding: 12px 20px;
    borderTopRightRadius: 12px;
    borderTopLeftRadius: 12px;
`
const ModalHide = styled.TouchableOpacity`
    flex: 1;
    backgroundColor: rgba(0,0,0,0);
`
const CounterWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 0px;
    border-top-width: 1px;
    border-top-color: #C7C7C7;
`
const CounterName = styled(Text)`
    font-size: 16px;
`
const CounterPrice = styled(Text)`
    font-size: 15px;
    font-weight: 700;
    color: #E77777;
`
const CounterDelivery = styled(Text)`
    font-size: 12px;
    color: #777777;
`
export default ProductDetail;

