/**
 * @format
 */

 import React from 'react';
import 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// account
import AccountEdit from '../app/page/account/AccountEdit';
import AccountFind from '../app/page/account/AccountFind';
import SignIn from '../app/page/account/SignIn';
import SignUp from '../app/page/account/SignUp';
import SignUpCondition from '../app/page/account/SignUpCondition';
import SignUpDetail from '../app/page/account/SignUpDetail';

// address
import AddressList from '../app/page/address/AddressList';
import AddressSearch from '../app/page/address/AddressSearch';
import AddressWrite from '../app/page/address/AddressWrite';

// mypage
import Cart from '../app/page/mypage/Cart';
import Mypage from '../app/page/mypage/Mypage';
import OrderList from '../app/page/mypage/OrderList';
import Qna from '../app/page/mypage/Qna';
import QnaAdd from '../app/page/mypage/QnaAdd';
import Review from '../app/page/mypage/Review';
import ReviewAdd from '../app/page/mypage/ReviewAdd';

// product
import ARView from '../app/page/product/ARView';
import Payment from '../app/page/product/Payment';
import ProductDetail from '../app/page/product/ProductDetail';
import ProductList from '../app/page/product/ProductList';
import ProductPayment from '../app/page/product/ProductPayment';

// else
import Main from '../app/page/Main.js';
import Footer from '../app/component/organization/Footer'

import MockAsyncStorage from 'mock-async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

it('PW Change UI Render Test', () => { renderer.create(<AccountEdit />); });
it('Account Find UI Render Test', () => { renderer.create(<AccountFind />); });
it('Login Render Test', () => { renderer.create(<SignIn />); });
it('SignUp UI Render Test', () => { renderer.create(<SignUp />); });
it('SignUp Condition Check UI Render Test', () => { renderer.create(<SignUpCondition />); });
it('SignUp Infomation UI Render Test', () => { renderer.create(<SignUpDetail />); });

it('Address Search UI Render Test', () => { renderer.create(<AddressSearch />); });
it('Cart UI Render Test', () => { renderer.create(<Cart />); });
it('Qna UI Render Test', () => { renderer.create(<Qna />); });
it('QnaAdd UI Render Test', () => { renderer.create(<QnaAdd />); });
it('Review UI Render Test', () => { renderer.create(<Review />); });

it('Payment UI Render Test', () => { renderer.create(<Payment />); });
it('Product Detail UI Render Test', () => { renderer.create(<ProductDetail />); });
it('Product List UI Render Test', () => { renderer.create(<ProductList/>); });
it('ProductPayment UI Render Test', () => { renderer.create(<ProductPayment />); });

it('Main UI Render Test', () => { renderer.create(<Main />); });
