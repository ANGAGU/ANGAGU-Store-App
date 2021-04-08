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
import ep2 from '../asset/img/example_product_2.webp'
import ep3 from '../asset/img/example_product_3.webp'

// react HTML
const ProductList = ({ navigation }) => {
    
    const [productList, setProductList] = useState([
        {
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
        {
            image: ep2,
            brand: 'LEIFARNE',
            name: '레이파르네 팔걸이의자',
            price: 69900,
            commentCount: '0',
            likeCount: '0',
            rating: '0'
        },
        {
            image: ep3,
            brand: 'RONNINGE',
            name: '뢴닝에 의자',
            price: 99900,
            commentCount: '6',
            likeCount: '2',
            rating: '4.3'
        },
        {
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
        {
            image: ep2,
            brand: 'LEIFARNE',
            name: '레이파르네 팔걸이의자',
            price: 69900,
            commentCount: '0',
            likeCount: '0',
            rating: '0'
        },
        {
            image: ep3,
            brand: 'RONNINGE',
            name: '뢴닝에 의자',
            price: 99900,
            commentCount: '6',
            likeCount: '2',
            rating: '4.3'
        },
        {
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
        {
            image: ep2,
            brand: 'LEIFARNE',
            name: '레이파르네 팔걸이의자',
            price: 69900,
            commentCount: '0',
            likeCount: '0',
            rating: '0'
        },
        {
            image: ep3,
            brand: 'RONNINGE',
            name: '뢴닝에 의자',
            price: 99900,
            commentCount: '6',
            likeCount: '2',
            rating: '4.3'
        },
        {
            image: ep1,
            brand: 'SVENBERTIL',
            name: '스벤베르틸 의자',
            price: 49900,
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
        {
            image: ep2,
            brand: 'LEIFARNE',
            name: '레이파르네 팔걸이의자',
            price: 69900,
            commentCount: '0',
            likeCount: '0',
            rating: '0'
        },
        {
            image: ep3,
            brand: 'RONNINGE',
            name: '뢴닝에 의자',
            price: 99900,
            commentCount: '6',
            likeCount: '2',
            rating: '4.3'
        },
    ]);
    return (
        <Container >
            <Header navigation={navigation}/>
            <ProductWrapper
                columnWrapperStyle={{justifyContent:'space-between'}}
                data={productList}
                renderItem={({ item }) => (
                    <ProductBox>
                        <ProductImage source={item.image}/>
                        <ProductBrand>{item.brand}</ProductBrand>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>￦ {item.price.toLocaleString()}</ProductPrice>
                        
                    </ProductBox>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    )
}

const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const ProductWrapper = styled.FlatList`
    flex: 1;
    margin: 0px 10px;
`
const ProductBox = styled.View`
    flex: 1;
    margin: 5px;
    padding: 10px;
    align-items: center;
`
const ProductImage = styled.Image`
    flex: 1;
    width: ${(screenWidth - 81) / 2}px;
    height: ${(screenWidth - 81) / 2}px;
    
    border-radius: 5px;
    margin-bottom: 13px;
    resize-mode: contain;
`
const ProductBrand = styled.Text`
font-weight: 800;   
`
const ProductName = styled.Text`
    margin: 4px;
`
const ProductPrice = styled.Text`
    
`
export default ProductList;

