// react import
import React, { useEffect, useState, useRef } from 'react';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import AutoHeightImage from 'react-native-auto-height-image';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import Text from '../component/atom/Text';
import ButtonWithText from '../component/atom/ButtonWithText';
import Header from '../component/organization/Header';

// local API
import {getProduct} from "../api/product/product";

// example Image
import ep1 from '../asset/img/example_product_1.webp';
import ep4 from '../asset/img/example_product_4.jpeg';
import epd1 from '../asset/img/example_product_description.jpeg'
import { View, Alert, Dimensions, Image, StyleSheet } from 'react-native';

 
// react HTML
const ProductDetail = ({ navigation, route }) => {
    const SliderWidth = Dimensions.get('screen').width;
    const ENTRIES1 = [
        {
          title: 'Beautiful and dramatic Antelope Canyon',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/UYiroysl.jpg',
        },
        {
          title: 'Earlier this morning, NYC',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
        },
        {
          title: 'White Pocket Sunset',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration: 'https://i.imgur.com/MABUbpDl.jpg',
        },
        {
          title: 'Acrocorinth, Greece',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
        },
        {
          title: 'The lone tree, majestic landscape of New Zealand',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
        },
      ];
    useEffect(() => {
        const init = async () =>{
            const productObject = await getProduct(route.params.productId);
            if (productObject.status == "success") {
                await setProductInfo(productObject.data);
                setLoading(true);
            }
            else
                Alert.alert('상품 정보 호출에 실패하였습니다.');
        }
        init();
    },[])
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselItems, setCarouselItems] = useState(ENTRIES1);
    const [productInfo, setProductInfo] = useState([])
    const onPurchaseClick = () => {
        navigation.navigate('ProductPayment', {
            productId: route.params.productId
        });
    }
    const onARClick = () => {
        navigation.navigate('ARView', {
            productId: route.params.productId
        });
    }
    const renderItem = ({item, index}, parallaxProps) => {
        
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                
                // borderWidth: 1,
                // borderRadius: 20,
                // borderColor: '#979797',
            }}
            >
                <ParallaxImage
                    // source={{uri: item.illustration}}
                    source={ep4}
                    containerStyle={{
                        flex: 1,
                        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
                        backgroundColor: 'white',
                    }}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        resizeMode: 'contain'
                    }}
                    parallaxFactor={0.1}
                    {...parallaxProps}
                />
            </View>
        );
    }
    const carousel = useRef(null);
    return (
        <Container>
            <Header navigation={navigation} title="상품 정보"/>
            {loading &&
            <ProductWrapper>
            {/* <ProductImage source={productInfo.image}/> */}

                <ProductImageWrapper>
                    <Carousel
                        
                        layout={'default'}
                        
                        ref={carousel}
                        data={carouselItems}
                        sliderWidth={SliderWidth}
                        sliderHeight={SliderWidth}
                        itemWidth={SliderWidth}
                        
                        renderItem={renderItem}
                        hasParallaxImages={true}
                        
                    />
                </ProductImageWrapper>
                
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
                <PurchaseButton onPress={onARClick}>AR View</PurchaseButton>
                <ProductDescriptionWrapper>
                    <ProductDescription source={epd1} width={SliderWidth}/>
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
const ProductImageWrapper = styled(View)`
    width: ${(screenWidth) - 100}px;
    height: ${(screenWidth) - 100}px;
`
const ProductImage = styled.Image`
    width: ${(screenWidth) - 100}px;
    height: ${(screenWidth) - 100}px;
    resize-mode: contain;
`

const ProductName = styled(Text)`
    flex: 1;
    margin-top: 10px;
    font-size: 22px;
`
const ProductPrice = styled(Text)`
    margin-top: 10px;
    font-size: 16px;
    flex: 1;
`
const ProductBrand = styled(Text)`
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    color: #35BCD6;
`
const ProductDescription = styled(AutoHeightImage)`
    flex: 1;
    resize-mode: contain;
`
const ProductDeliveryCharge = styled(Text)`
    margin-left: 10px;
    font-size: 12px;
`
const ProductDescriptionWrapper = styled.View`
    
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

