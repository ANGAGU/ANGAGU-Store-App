// react import
import React, { useEffect, useState, useRef } from 'react';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';
// import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
// import AutoHeightImage from 'react-native-fast-auto-height-image';
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import Text from '../component/atom/Text';
import ButtonWithText from '../component/atom/ButtonWithText';
import Header from '../component/organization/Header';
import { BACKEND_ASSET_URL } from '../api/constants';
// local API
import {getProduct} from "../api/product/product";

// example Image
import ep1 from '../asset/img/example_product_1.webp';
// import ep4 from '../asset/img/example_product_4.jpeg';
// import epd1 from '../asset/img/example_product_description.jpeg'
import { View, Alert, Dimensions, Image, StyleSheet, Slider } from 'react-native';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
 
// react HTML
const ProductDetail = ({ navigation, route }) => {
    const SliderWidth = Dimensions.get('screen').width;

    const [imgHeight, setImgHeight] = useState(0);
    const [token, setToken] = useState("");
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
    const [productInfo, setProductInfo] = useState([])
    const onPurchaseClick = () => {
        if (token == '' || token == null)
            navigation.navigate('SignIn', {
                callback: route.params.productId   
            });
        else
            navigation.navigate('ProductPayment', {
                productId: route.params.productId
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
                            fullStar= {require('../asset/img/star_full.png')}
                            emptyStar= {require('../asset/img/star_empty.png')}
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
            <PurchaseButton onPress={onARClick}>AR View</PurchaseButton>
            <PurchaseButton
                buttonColor="#35BCD6"
                textColor="#ffffff"
                onPress={onPurchaseClick}
            >
                {'구매하기'}
            </PurchaseButton>
            
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
    border-radius: 0px;
`
export default ProductDetail;

