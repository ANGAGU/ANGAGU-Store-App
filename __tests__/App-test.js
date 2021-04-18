/**
 * @format
 */

 import React from 'react';
import 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Login from '../app/page/Login';
import ProductList from '../app/page/ProductList';
import ProductDetail from '../app/page/ProductDetail';
import ProductPayment from '../app/page/ProductPayment';
import OrderList from '../app/page/OrderList';
import Main from '../app/page/Main';

it('Login UI Render Test', () => {
  renderer.create(<Login />);
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
