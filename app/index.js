// react import
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';

// lib import
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

// root
import Splash from './page/Splash.js';
import Main from './page/Main.js';

// address
import AddressList from './page/address/AddressList';
import AddressWrite from './page/address/AddressWrite';
import AddressSearch from './page/address/AddressSearch.js';

// account
import SignIn from './page/account/SignIn.js';
import SignUp from './page/account/SignUp.js';
import SignUpDetail from './page/account/SignUpDetail.js';
import AccountFind from './page/account/AccountFind.js';
import AccountEdit from './page/account/AccountEdit.js';

// product
import ProductList from './page/product/ProductList.js';
import ProductDetail from './page/product/ProductDetail.js';
import ProductPayment from './page/product/ProductPayment.js';
import Payment from './page/product/Payment.js';
import ARView from './page/product/ARView.js';

// mypage
import Mypage from './page/mypage/Mypage.js';
import Review from './page/mypage/Review.js';
import ReviewAdd from './page/mypage/ReviewAdd.js';
import OrderList from './page/mypage/OrderList.js';
import Cart from './page/mypage/Cart';
import Qna from './page/mypage/Qna';
import QnaAdd from './page/mypage/QnaAdd';


const Stack = createStackNavigator();
// react HTML (jsx)
const Page = () => {

    // Variables
    const [isLoading, setIsLoading] = useState(true);

    // Loading
    useEffect(() => {
        // Show splash for 2 seconds
        setTimeout(() =>  setIsLoading(false) , 2000);
        
        // return () => clearTimeout(timeout)
    },[]);
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={(Platform.OS === 'ios')? "padding" : null} enabled>
            <Container/>
            {
                isLoading ?
                <Splash /> 
            :
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
                        <Stack.Screen name="SignUpDetail" component={SignUpDetail} options={{ headerShown: false }}/>
                        <Stack.Screen name="AccountFind" component={AccountFind} options={{ headerShown: false }}/>
                        <Stack.Screen name="AccountEdit" component={AccountEdit} options={{ headerShown: false }}/>
                        <Stack.Screen name="AddressList" component={AddressList} options={{ headerShown: false }}/>
                        <Stack.Screen name="AddressWrite" component={AddressWrite} options={{ headerShown: false }}/>
                        <Stack.Screen name="AddressSearch" component={AddressSearch} options={{ headerShown: false }}/>
                        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }}/>
                        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }}/>
                        <Stack.Screen name="ProductPayment" component={ProductPayment} options={{ headerShown: false }}/>
                        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
                        <Stack.Screen name="Review" component={Review} options={{ headerShown: false }}/>
                        <Stack.Screen name="ReviewAdd" component={ReviewAdd} options={{ headerShown: false }}/>
                        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
                        <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: false }}/>
                        <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }}/>
                        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }}/>
                        <Stack.Screen name="Qna" component={Qna} options={{ headerShown: false }}/>
                        <Stack.Screen name="QnaAdd" component={QnaAdd} options={{ headerShown: false }}/>
                        <Stack.Screen name="ARView" component={ARView} options={{ headerShown: false }}/>
                        
                    </Stack.Navigator>
                </NavigationContainer>
            }
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAvoidingView>
    );  
}

export default Page
// react CSS (styled)
const Container = styled.SafeAreaView`
    background-color: #ffffff;
`;
