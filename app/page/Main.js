// react import
import React, {useEffect, useState} from 'react';
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


// local API
import login from '../api/auth/login';
import Header from '../component/organization/Header';
import Footer from '../component/organization/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// react HTML
const OrderList = ({navigation}) => {
  // variables
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(()=> {
        const Loading = async() => {
            setIsLoading(true);
        }
        Loading();
        
    })
    
  return (
    <Container>
        <LogoWrapper>
            <LogoSmallText>어디 밖에 매장</LogoSmallText>
            <LogoText>안가구</LogoText>
        </LogoWrapper>
        {isLoading &&
        <>
            <MainWrapper>
                <Text>서비스 준비 중 입니다.</Text>
            </MainWrapper>
            <Footer navigation={navigation}/>
        </>
        }
        
    </Container>
  );
};

export default OrderList;

// react CSS
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const LogoWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const LogoText = styled.Text`
    margin-top: 5px;
    font-size: 45px;
    color: #35bcd6;
    font-weight: 800;
`;
const LogoSmallText = styled.Text`
    font-size: 19.5px;
    color: #000000;
    font-weight: 500;
`;
const MainWrapper = styled.View`
    flex: 4;
    background: #E7E7E7E7;
    justify-content: center;
    align-items: center;
`
