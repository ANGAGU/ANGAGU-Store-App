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

// local import
import Splash from './page/Splash.js';
import SignIn from './page/SignIn.js';
import ProductList from './page/ProductList.js';
import ProductDetail from './page/ProductDetail.js';
import ProductPayment from './page/ProductPayment.js';
import Main from './page/Main.js';
import OrderList from './page/OrderList.js';
import SignUp from './page/SignUp.js';

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
                        <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }}/>
                        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }}/>
                        <Stack.Screen name="ProductPayment" component={ProductPayment} options={{ headerShown: false }}/>
                        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
                        <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </KeyboardAvoidingView>
    );  
}

export default Page
// react CSS (styled)
const Container = styled.SafeAreaView`
    background-color: #ffffff;
`;
