// react import
import React, { useEffect, useState, useRef } from 'react';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';
import CounterInput from "react-native-counter-input";
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient';

// local import 
import {screenWidth} from '../../util/dimension';
import Input from '../../component/atom/Input';
import Text from '../../component/atom/Text';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Counter from '../../component/molecule/Counter';
import Header from '../../component/organization/Header';
import { BACKEND_ASSET_URL } from '../../api/constants';
// local API
import {getProduct} from "../../api/product/product";

// example Image
import ep1 from '../../asset/img/example_product_1.webp';
// import ep4 from '../asset/img/example_product_4.jpeg';
// import epd1 from '../asset/img/example_product_description.jpeg'
import { View, Alert, Dimensions, Image, StyleSheet, Slider, Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { getQna } from '../../api/product/qna';
import { addCart, delCart, getCart } from '../../api/product/cart';
 
// react HTML
const ProductDetail = ({ navigation, route }) => {
    const SliderWidth = Dimensions.get('screen').width;
    const [showDetail, setShowDetail] = useState(false);
    const [imgHeight, setImgHeight] = useState(0);
    const [token, setToken] = useState("");
    const [modal, setModal] = useState(false);
    const [qnaCount, setQnaCount]= useState(0);
    const [toggle, setToggle] = useState(false);
    const [toggleId, setToggleId] = useState(0);
    const [isAR, setIsAR] = useState(false);
    const refreshCart = async () => {
        const result = await getCart();
            result.data.map(
                (item) => {
                    if (item.product_id == route.params.productId){
                        setToggle(true);
                        setToggleId(item.id);
                    }
                }
            )
    }
    useEffect(() => {
        const init = async () =>{
            const productObject = await getProduct(route.params.productId);
            if (productObject.status == "success") {
                const qna = await getQna(route.params.productId);
                setQnaCount(qna.data.length);
                await setProductInfo(productObject.data);
                
                if (productObject.data["3d_model_url"] != null) setIsAR(true);
                const token = await AsyncStorage.getItem('token')
                setToken(token);
                if (token != null && token != ""){
                    const result = await getCart();
                    result.data.map(
                        (item) => {
                            if (item.product_id == route.params.productId){
                                setToggle(true);
                                setToggleId(item.id);
                            }
                        }
                    )
                }
                setLoading(true);
            }
            else
                Alert.alert('?????? ?????? ????????? ?????????????????????.');            
            
        }
        init();
    },[])
    
    const [loading, setLoading] = useState(false);    
    const [productInfo, setProductInfo] = useState({

    })
    const [productCount, setProductCount] = useState(1);
    const onPurchaseClick = () => {
        setModal(false);
        if (token == '' || token == null)
            navigation.navigate('SignIn', {
                callback: route.params.productId   
            });
        else
            navigation.navigate('ProductPayment', {
                productId: route.params.productId,
                productCount: productCount
            });
    }
    const onARClick = () => {
        navigation.navigate('ARView', {
            productId: route.params.productId,
            modelUrl: route.params.modelUrl,
            modelName: route.params.modelName
        });
    }
    const onCart = async () => {
        if (token == '' || token == null)
            navigation.navigate('SignIn', {
                callback: route.params.productId   
            });
        else {
            if (toggle){
                const result = await delCart(toggleId);
                if (result.status == "success")
                    Alert.alert("???????????? ??????", "?????????????????? ?????????????????????.")
            } else {
                const result = await addCart(route.params.productId);
                
                if (result.status == "success"){
                    Alert.alert("???????????? ??????", "??????????????? ?????????????????????.")
                }
            }
            setToggle(false);
            refreshCart();
        }
    }
    // const carousel = useRef(null);
    return (
        <Container>
            <Header navigation={navigation} title='?????? ??????'/>
            {loading &&
            <ProductWrapper>
                
                <ProductImage source={{uri: BACKEND_ASSET_URL + '/' + productInfo.thumb_url}}/>
                
                <ProductInfoWrapper>
                    <ProductName>{productInfo.name}</ProductName>
                    <ProductPrice>??? {productInfo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ProductPrice>
                    <StarWrapper>
                    
                        {/* <ProductBrand>
                            {productInfo.brand}
                        </ProductBrand> */}
                        <Stars
                            display={productInfo.reviews.length == 0 ? 0 : productInfo.reviews.reduce((sum, review) => {return sum + review.star},0)}
                            spacing={2}
                            count={5}
                            starSize={12}
                            fullStar= {require('../../asset/img/star_full.png')}
                            emptyStar= {require('../../asset/img/star_empty.png')}
                        />
                        <StarNum>{`(${productInfo.reviews.length})`}</StarNum>    
                        <ProductDeliveryCharge>
                            ????????? {productInfo.delivery_charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ???
                        </ProductDeliveryCharge>
                        
                    </StarWrapper>
                </ProductInfoWrapper>
                
                <ProductDescriptionWrapper style={showDetail ? null: {height: 800}}>

                    <AutoHeightWebView
                        source={{
                            // uri: BACKEND_ASSET_URL + '/' + productInfo.description_url,
                            html: `<img width=${SliderWidth}px src="${BACKEND_ASSET_URL}/${productInfo.description_url}"/>`
                        }}
                        style={{
                            width: SliderWidth
                        }} 
                    />
                    {/* gradient for showing cut */}
                    {!showDetail && 
                    <>
                        <LinearGradient
                            colors={['rgba(255,255,255,0)', '#333333']}
                            start={{x:0, y:0}}
                            end={{x:0, y:1}}
                            style={{ position: 'absolute', height: 200, bottom: 0, width: SliderWidth}}
                        />
                        <ShowMoreButton 
                            buttonColor="rgba(0,0,0,0)"
                            textColor="#F7F7F7"
                            onPress={() => {setShowDetail(true)}}
                        >
                            ???????????? ????????? ???
                        </ShowMoreButton>
                    </>
                    }

                </ProductDescriptionWrapper>
                <ReviewWrapper onPress={()=> {navigation.navigate("Review", {review: productInfo.reviews})}} imageMode={true} textColor={'#000000'}>
                    <TitleWrapper>
                        <Title >{`?????? ??????`}</Title>
                        <SubTitle>{`(${productInfo.reviews.length})`}</SubTitle>
                    </TitleWrapper>
                    <Title>{'>'}</Title>
                </ReviewWrapper>
                <QnaWrapper onPress={()=> {navigation.navigate("Qna",{productId: route.params.productId})}} imageMode={true} textColor={'#000000'}>
                    <TitleWrapper>
                        <Title >{`?????? ??????`}</Title>
                        <SubTitle>{`(${qnaCount})`}</SubTitle>
                    </TitleWrapper>
                    <Title>{'>'}</Title>
                </QnaWrapper>
                <Announce>
                    <AnnounceText>
                        ?????? ???????????? ????????? ??????????????????(????????????) ????????? ?????? ??????, ????????????, ?????? ??? ????????? ????????? ????????? ??? ???????????? ????????????, ?????? ????????? ???????????? ??????????????????????????? ??????????????? ???????????? ???????????? ?????? ????????? ?????? ????????????.
                    </AnnounceText>
                </Announce>
            </ProductWrapper>    
            }
            <PurchaseWrapper>

                {isAR ? 
                    <>
                        <PurchaseButton onPress={onARClick}>AR View</PurchaseButton>
                        <PurchaseButton
                            buttonColor="#35BCD6"
                            textColor="#ffffff"
                            // onPress={onPurchaseClick}
                            onPress={() => setModal(true)}
                        >
                            {'????????????'}
                        </PurchaseButton>
                    </> 
                :
                    <FullPurchaseButton
                        buttonColor="#35BCD6"
                        textColor="#ffffff"
                        // onPress={onPurchaseClick}
                        onPress={() => setModal(true)}
                    >
                        {'????????????'}
                    </FullPurchaseButton>
                }
            </PurchaseWrapper>
            {loading &&
            <Modal
              animated
              animationType="fade"
              visible={modal}
              transparent
              onRequestClose={() => setModal(false)}
            >
                <ModalBackground>
                    <ModalHide onPress={() => setModal(false)}/>
                    <ModalView>
                        <CounterPrice>{(productInfo.price * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ???</CounterPrice>
                        <CounterDelivery>?????? ?????? : {(productInfo.delivery_charge * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ???</CounterDelivery>
                        <CounterWrapper>
                            <CounterName>{productInfo.name}</CounterName>
                            <Counter value={productCount} setValue={setProductCount} min={1} max={10}/>
                        </CounterWrapper>
                        <PurchaseWrapper>
                            <PurchaseButton onPress={onCart}>{toggle ? '???????????? ??????': '???????????? ??????'}</PurchaseButton>
                            <PurchaseButton
                                buttonColor="#35BCD6"
                                textColor="#ffffff"
                                // onPress={onPurchaseClick}
                                onPress={onPurchaseClick}
                            >
                                {'????????????'}
                            </PurchaseButton>
                        </PurchaseWrapper>
                        {/* <ModalButton
                            buttonColor="#35BCD6"
                            textColor="#ffffff"
                            onPress={onPurchaseClick}
                            // onPress={() => setModal(true)}
                        >
                            {'????????????'}
                        </ModalButton> */}
                    </ModalView>
                </ModalBackground>

            </Modal>
            }
        </Container>
    )
}
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const ProductWrapper = styled.ScrollView`
    background-color: #E7E7E7;
    flex: 1;
    flex-direction: column;
`
const ProductInfoWrapper = styled.View`
    background-color: #FEFEFE;
    flex: 1;
    padding: 20px;
    flex-direction: column;
    margin-bottom: 10px;
`
const ProductImage = styled.Image`
    width: ${(screenWidth)}px;
    height: ${(screenWidth)}px;
    resize-mode: contain;
`
const StarNum = styled(Text)`
    font-size: 11px;
    color: #777777;
    margin-left: 2px;
`
const ProductName = styled(Text)`
    margin-top: 10px;
    font-size: 22px;
`
const ProductPrice = styled(Text)`
    margin-top: 10px;
    font-size: 16px;
`
const ProductBrand = styled(Text)`
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    color: #35BCD6;
`
const ProductDescription = styled(FastImage)`
    flex:1;
    width=${screenWidth};
`
const ProductDeliveryCharge = styled(Text)`
    margin-left: 10px;
    font-size: 12px;
`
const ProductDescriptionWrapper = styled.View`
    margin-bottom: 10px;
`
const ReviewWrapper = styled(ButtonWithText)`
    margin-bottom: 10px;
    padding: 16px 20px;   
    background-color: #FEFEFE;
    justify-content: space-between;
    flex-direction: row;
    border-radius: 0px;
`
const QnaWrapper = styled(ButtonWithText)`
    padding: 16px 20px;
    border-radius: 0px;
    background-color: #FEFEFE;
    justify-content: space-between;
    flex-direction: row;
`
const Announce = styled.View`
    padding: 20px;
`
const AnnounceText = styled(Text)`
    color: #888888;
    text-align: justify;
    font-size: 11px;
`
const Title = styled(Text)`
    font-size: 16px;

`
const TitleWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`
const SubTitle = styled(Text)`
    font-size: 12px;
    color: #A7A7A7;
    margin-left: 4px;
`
const StarWrapper = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

const PurchaseButton = styled(ButtonWithText)`
    height: 48px;
    width: 49%;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const FullPurchaseButton = styled(ButtonWithText)`
    height: 48px;
    width: 99%;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const ModalButton = styled(ButtonWithText)`
    height: 48px;
    width: 100%;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
`
const PurchaseWrapper = styled.View`
    margin: 1% 1%;
    flex-direction: row;
    justify-content: space-around;
`

const ModalBackground = styled.View`
    backgroundColor: rgba(0,0,0,0.5);
    flex: 1;
    justifyContent: flex-end;
`
const ModalView = styled.View`
    backgroundColor: #FEFEFE;
    padding: 12px 20px;
    borderTopRightRadius: 12px;
    borderTopLeftRadius: 12px;
`
const ModalHide = styled.TouchableOpacity`
    flex: 1;
    backgroundColor: rgba(0,0,0,0);
`
const CounterWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 0px;
    border-top-width: 1px;
    border-top-color: #C7C7C7;
`
const CounterName = styled(Text)`
    font-size: 16px;
`
const CounterPrice = styled(Text)`
    font-size: 15px;
    font-weight: 700;
    color: #E77777;
`
const CounterDelivery = styled(Text)`
    font-size: 12px;
    color: #777777;
`
const ShowMoreButton = styled(ButtonWithText)`
    border: 1px solid #E7E7E7;
    margin: 10px 10px;
`

export default ProductDetail;

