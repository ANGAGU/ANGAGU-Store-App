# About ANGANU App Store Frontend

<br>
<br>

<p align="center">
  <img width="260" alt="캡처" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5706aeda-e608-45c2-8da7-b56d83f9ff5e/instagram_profile_image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210605T165102Z&X-Amz-Expires=86400&X-Amz-Signature=e75a85dc498e10e02b80a4c2b9cc96ca256146b75231c6450a9092b0c685ae0b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22instagram_profile_image.png%22">
</p>
<p align="center">
  <b>
    AR기반 온라인 가구 오픈마켓 서비스
  </b>
</p>
<p align="center">
  <b>
    AR-based online furniture open market service
  </b>
</p>

<br>

## **Table of Content**
---
<br>

1. [기능](#1.)
2. [시연](#2.)
3. [설치 방법](#3.)
4. [기술요소](#4.)
5. [디자인 패턴 (폴더)](#5.)

<br>

## 1. Features
---
<br>

### Customer

- 회원가입/로그인
- 상품검색
- 상품결제/장바구니/주문내역
- 구매후기
- 상품문의
- 배송지관리
- 회원정보관리

<br>
<br>

## 2. Screenshots
---
<br>


<p align="center">
  
  - 회원가입/로그인
    <br>
    <img alt="로그인" width="100%" src="https://user-images.githubusercontent.com/56831352/120950008-d2b8cd80-c780-11eb-8871-befd27db50ec.PNG"/>
    <img alt="로그인" width="100%" src="https://user-images.githubusercontent.com/56831352/120950014-d3e9fa80-c780-11eb-822c-f20108f63655.PNG"/>
    <img alt="로그인" width="100%" src="https://user-images.githubusercontent.com/56831352/120950015-d3e9fa80-c780-11eb-843f-33236f6caa34.PNG"/>
    <br>
    <br>
  - 상품검색
    <br>
    <img alt="상품검색" width="100%" src="https://user-images.githubusercontent.com/56831352/120950017-d4829100-c780-11eb-80a7-e207bfc89a6c.PNG"/>
    <img alt="상품검색" width="100%" src="https://user-images.githubusercontent.com/56831352/120950021-d51b2780-c780-11eb-9c5f-e518d2b3d418.PNG"/>
    <br>
    <br>
  - 상품결제/장바구니/주문내역
    <br>
    <img alt="상품결제" width="100%" src="https://user-images.githubusercontent.com/56831352/120950022-d51b2780-c780-11eb-876b-f69daf7b93a8.PNG"/>
    <img alt="상품결제" width="100%" src="https://user-images.githubusercontent.com/56831352/120950024-d5b3be00-c780-11eb-9c5d-b99be3ebf22c.PNG"/>
    <br>
    <br>
  - 구매후기
    <br>
    <img alt="구매후기" width="100%" src="https://user-images.githubusercontent.com/56831352/120950025-d5b3be00-c780-11eb-802e-41e0c65a4747.PNG"/>
    <br>
    <br>
  - 상품문의
    <br>
    <img alt="구매후기" width="100%" src="https://user-images.githubusercontent.com/56831352/120950026-d64c5480-c780-11eb-9a9b-a44dc3aec840.PNG"/>
    <br>
    <br>
  - 배송지관리
    <br>
    <img alt="구매후기" width="100%" src="https://user-images.githubusercontent.com/56831352/120950028-d64c5480-c780-11eb-8463-909ef77a21fb.PNG"/>
    <img alt="구매후기" width="100%" src="https://user-images.githubusercontent.com/56831352/120950032-d6e4eb00-c780-11eb-8a1a-ecd5ce670f4e.PNG"/>
    <br>
    <br>
  - 회원정보관리
    <br>
    <img alt="구매후기" width="100%" src="https://user-images.githubusercontent.com/56831352/120950033-d6e4eb00-c780-11eb-9bbb-a7af2de37833.PNG"/>
    <br>
    <br>

</p>

<br>
<br>

## 3. Setup
---
<br>
First, you should run
### `npm install`

Download the node_moudules used in project.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install`

Install the package module required to run the app.\
Installed modules are stored in the `node_modules` folder, not in the origin git project by `.gitignore`.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `react-native run-android`

Runs the app in the android environment.\

### `react-native run-ios`

Runs the app in the ios environment.\


<br>
<br>

## 4. Tech

---
<br>

|name|version|
|------|---|
|React| Version 17.0.1|
|React-Native| Version 0.64.0|
|styled-components| Version ^5.2.3|
|@asmadsen/react-native-unity-view|Version ^0.0.7|
|iamport-react-native|Version ^1.6.3|
|react-test-renderer|Version 17.0.1|
|Jest|Version 26.6.3|
|Axios|Version ^0.21.1|


## 5. Design Pattern
---
<br>

|path|description|
|------|---|
|/unity/| unity project that used in AR|
|/app/index/| router for all files|
|/app/api/| use to connect with backend (using axios)|
|/app/asset/| files like icons and images|
|/app/component/| components that use for common like text, input, button|
|/app/pages/| view that people actually access|
|/app/util/|common functions that use for get format or screen size|
|/\_\_tests\_\_/|react native ui render test files|
