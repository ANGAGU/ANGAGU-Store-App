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
import Login from './page/Login.js';

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
                <App /> 
            :
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </KeyboardAvoidingView>
    );  
}

export default Page
// react CSS (styled)
const Container = styled.SafeAreaView`
    background-color: #35BCD6;
`;
