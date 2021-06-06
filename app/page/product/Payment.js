import React, { useEffect, useState } from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';

/* 로딩 컴포넌트를 불러옵니다. */
import Splash from '../Splash';
import { View } from 'react-native';
import { setOrder } from '../../api/order/order';

export function Payment({ navigation, route }) {
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  const callback = async(response) => {
    if (response.imp_success == "true"){
      await setOrder(route.params.productId, route.params.count, response.imp_uid, response.merchant_uid, route.params.addressId, price, deliveryCharge);
      navigation.navigate("ProductDetail", {productId: route.params.productId})
    } 
    else
    {
      navigation.goBack(); 
    }
  }
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(1000000);
  const [deliveryCharge, setDeliveryCharge] = useState(1000000);
  const [address, setAddress] = useState("서울시 강남구 신사동 661-16");
  const [name, setName] = useState("홍길동");
  const [postcode, setPostcode] = useState("06018");
  useEffect( () => {
    (async () => {
      setPrice(route.params.price);
      setDeliveryCharge(route.params.delivery_charge);
      setAddress(route.params.address);
      setName(route.params.name);
      setPostcode(route.params.postcode);
      setLoading(true);
    })()
    
  },[])
  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = {
    pg: 'html5_inicis',
    pay_method: 'card',
    name: '아임포트 결제데이터 분석',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: (price + deliveryCharge),
    // amount: 100,
    buyer_name: name,
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: address,
    buyer_postcode: postcode,
    app_scheme: 'angagu_app',
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    loading ?
      <IMP.Payment
        userCode={'imp53513947'}  // 가맹점 식별코드
      //   tierCode={'AAA'}      // 티어 코드: agency 기능 사용자에 한함
      //   loading={<Splash />} // 웹뷰 로딩 컴포넌트
        data={data}           // 결제 데이터
        callback={callback}   // 결제 종료 후 콜백
      />
    :
      <View>
      </View>
  );
}

export default Payment;