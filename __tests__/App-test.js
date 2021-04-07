/**
 * @format
 */

import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Login from '../app/page/Login';
import ProductList from '../app/page/ProductList';

it('Login UI Render Test', () => {
  renderer.create(<Login />);
});

it('ProductList UI Render Test', () => {
  renderer.create(<ProductList />);
});
