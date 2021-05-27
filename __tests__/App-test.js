/**
 * @format
 */

 import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SignIn from '../app/page/SignIn';
import SignUp from '../app/page/SignUp';
import AccountFind from '../app/page/AccountFind';
import ProductList from '../app/page/ProductList';
import ProductDetail from '../app/page/ProductDetail';
import ProductPayment from '../app/page/ProductPayment';
import OrderList from '../app/page/OrderList.js';
import Main from '../app/page/Main.js';
import Footer from '../app/component/organization/Footer'
import MockAsyncStorage from 'mock-async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);


it('Login SignIn UI Render Test', () => {
  renderer.create(<SignIn />);
});


it('ProductList UI Render Test', () => {
  renderer.create(<ProductList />);
});

it('ProductDetail UI Render Test', () => {
  renderer.create(<ProductDetail />);
});

it('ProductPayment UI Render Test', () => {
  renderer.create(<ProductPayment />);
});

it('OrderList UI Render Test', () => {
  renderer.create(<OrderList />);
});

it('Main UI Render Test', () => {
  renderer.create(<Main />);
});

it('Footer UI and Logout Render Test', () => {
  renderer.create(<Footer />);
})

it('SignUp UI and Logout Render Test', () => {
  renderer.create(<SignUp />);
})

it('Account Find UI Render Test', () => {
  renderer.create(<AccountFind />);
})



