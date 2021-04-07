// react import
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

// lib import
import styled from 'styled-components/native';

// local import 
import {screenWidth} from '../util/dimension';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';

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
            price: '49900',
            commentCount: '7',
            likeCount: '0',
            rating: '4.6'
        },
        {
            image: ep2,
            brand: 'LEIFARNE',
            name: '레이파르네 팔걸이의자',
            price: '69900',
            commentCount: '0',
            likeCount: '0',
            rating: '0'
        },
        {
            image: ep3,
            brand: 'RONNINGE',
            name: '뢴닝에 의자',
            price: '99900',
            commentCount: '6',
            likeCount: '2',
            rating: '4.3'
        },
    ]);
    return (
        <Container >
            {productList.map(() => {
                <></>
            })}
        </Container>
    )
}

const Container = styled.ScrollView`
  background-color: #ffffff;
  flex: 1;
`;

export default ProductList;

