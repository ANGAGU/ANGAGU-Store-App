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
    return (
        <Container>
            
        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;

export default ProductDetail;

