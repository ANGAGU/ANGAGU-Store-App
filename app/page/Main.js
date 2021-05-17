// react import
import React, {useEffect, useState} from 'react';
import {View} from 'react-native'
// lib import
import styled from 'styled-components/native';

// local API
import Footer from '../component/organization/Footer';
import { BACKEND_ASSET_URL } from '../api/constants';

// local Components
import Text from '../component/atom/Text';
import { getProduct } from '../api/product/product';

// react HTML
const OrderList = ({navigation}) => {
  // variables
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setProductList] = useState([])
    const ProductClick = (productId) => {
        navigation.navigate('ProductDetail', {
            productId,
        });
    }
    useEffect(()=> {
        const Loading = async () => {
            let result = await getProduct();
            if (result.status == 'success'){
                setProductList(result.data);
            } else {
                Alert.alert("상품 불러오기 실패", "상품을 불러오는데 실패하였습니다.")
            }
            setIsLoading(true);
        }
        Loading();
    }, [])
    
    return (
        <Container>
            <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
                <LogoText>Angagu</LogoText>
            </LogoWrapper>
            {isLoading &&
                <>
                    <MainWrapper>
                        <MenuWrapper>
                            <MenuText>인기 상품</MenuText>
                            <MenuList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{flexDirection:'row'}}
                            >
                                {productList.sort((a,b) => b.sell_count - a.sell_count).map((product, inx) => { 
                                    return (
                                        <MenuProductWrapper onPress={() => ProductClick(product.id)} key={inx} >
                                            <MenuImage 
                                                
                                                source={{uri: BACKEND_ASSET_URL + '/' + product.thumb_url}}
                                            />
                                            <MenuProductName>
                                                {product.name}
                                            </MenuProductName>
                                            <MenuProductPrice>
                                                ￦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </MenuProductPrice>
                                        </MenuProductWrapper>
                                    )
                                    
                                    // return <Text key={inx}>Hi</Text>
                                })}
                            </MenuList>
                        </MenuWrapper>
                        <MenuWrapper>
                            <MenuText>새 상품</MenuText>
                            <MenuList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{flexDirection:'row'}}
                            >
                                {productList.sort((a,b) => Number(b.create_time.split(".")[0].replace(/-/g,"").replace("T","").replace(/:/g,"")) - Number(a.create_time.split(".")[0].replace(/-/g,"").replace("T","").replace(/:/g,""))).map((product, inx) => { 
                                    return (
                                        <MenuProductWrapper onPress={() => ProductClick(product.id)} key={inx}>
                                            <MenuImage 
                                                
                                                source={{uri: BACKEND_ASSET_URL + '/' + product.thumb_url}}
                                            />
                                            <MenuProductName>
                                                {product.name}
                                            </MenuProductName>
                                            <MenuProductPrice>
                                                ￦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </MenuProductPrice>
                                        </MenuProductWrapper>
                                    )
                                    
                                    // return <Text key={inx}>Hi</Text>
                                })}
                            </MenuList>
                        </MenuWrapper>
                        <MenuWrapper>
                            <MenuText>매진 직전 상품</MenuText>
                            <MenuList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{flexDirection:'row'}}
                            >
                                {productList.sort((a,b) => a.stock - b.stock).map((product, inx) => { 
                                    return (
                                        <MenuProductWrapper onPress={() => ProductClick(product.id)} key={inx}>
                                            <MenuImage 
                                                
                                                source={{uri: BACKEND_ASSET_URL + '/' + product.thumb_url}}
                                            />
                                            <MenuProductName>
                                                {product.name}
                                            </MenuProductName>
                                            <MenuProductPrice>
                                                ￦ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </MenuProductPrice>
                                        </MenuProductWrapper>
                                    )
                                    
                                    // return <Text key={inx}>Hi</Text>
                                })}
                            </MenuList>
                        </MenuWrapper>
                    </MainWrapper>
                    
                </>
            }
            <Footer navigation={navigation}/>
        </Container>
    );
};

export default OrderList;

// react CSS
const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;
const LogoWrapper = styled.View`
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
`;
const LogoText = styled(Text)`
    margin-top: 5px;
    font-size: 22px;
    color: #35bcd6;
    font-weight: 800;
`;
const LogoSmallText = styled(Text)`
    font-size: 20px;
    color: #000000;
    font-weight: 500;
`;
const MenuWrapper = styled.View`
    height: 260px;
`
const MenuList = styled.ScrollView`
    flex: 1;
    flex-direction: row;
    height: 180px;
`
const MenuProductWrapper = styled.TouchableOpacity`
    height: 210px;
    width: 180px;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
`
const MenuProductName = styled(Text)`
    font-weight: 800;   
    font-size: 16px;
`
const MenuProductPrice = styled(Text)`
    font-size: 12px;
`
const MenuImage = styled.Image`
    height: 160px;
    width: 160px;
`
const MenuText = styled(Text)`
    font-size: 18px;
    color: #575757;
    font-weight: 600;
    margin: 10px 0px;
`
const MainWrapper = styled.ScrollView`
    flex: 1;
    padding: 10px 20px;
`
