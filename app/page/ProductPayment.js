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
import product from "../api/product/product";

// example Image
import ep1 from '../asset/img/example_product_1.webp';

 
// react HTML
const ProductPayment = ({ navigation, route }) => {
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

        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;

export default ProductPayment;

