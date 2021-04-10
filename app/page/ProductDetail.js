// react import
import React, { useEffect, useState } from 'react';
import {
    FlatList,   
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';
import Header from '../component/organization/Header'

// example Image
import ep1 from '../asset/img/example_product_1.webp'

// react HTML
const ProductDetail = ({ navigation }) => {
    const [productInfo, setProductInfo] = useState(
        {
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
    )
    return (
        <Container>
            <Header navigation={navigation} title="뒤로가기"/>
            <ProductWrapper>
                <ProductImage source={productInfo.image}/>
                <ProductInfoWrapper>
                    <ProductBrand>{productInfo.brand}</ProductBrand>
                    <ProductName>{productInfo.name}</ProductName>
                    <ProductPrice>￦ {productInfo.price.toLocaleString()}</ProductPrice>
                </ProductInfoWrapper>
            </ProductWrapper>    
        </Container>
    )
}
const Container = styled.ScrollView`
    background-color: #ffffff;
    flex: 1;
`;
const ProductWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
`
const ProductInfoWrapper = styled.View`
    flex: 1;
    margin: 20px;
    width: ${(screenWidth - 40)}px;
    flex-direction: column;
`
const ProductImage = styled.Image`
    flex: 1;
    width: ${(screenWidth)}px;
    height: ${(screenWidth)}px;
    border-radius: 5px;
    margin-bottom: 13px;
    resize-mode: contain;
`
const ProductName = styled.Text`
    flex: 1;
    margin-top: 10px;
    font-size: 20px;
`
const ProductPrice = styled.Text`
    margin-top: 10px;
    flex: 1;
`
const ProductBrand = styled.Text`
    flex: 1;
    font-weight: 600;
    
    color: #35BCD6;
`

export default ProductDetail;

