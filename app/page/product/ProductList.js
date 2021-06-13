// react import
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

// lib import
import styled from 'styled-components/native';
import Stars from 'react-native-stars';

// local import 
import {screenWidth} from '../../util/dimension';
import Text from '../../component/atom/Text';
import Input from '../../component/atom/Input'
import Header from '../../component/organization/Header';
import { BACKEND_ASSET_URL } from '../../api/constants';

// local API
import { getProduct } from '../../api/product/product';

// example Image
import ep1 from '../../asset/img/example_product_1.webp'
import ep2 from '../../asset/img/example_product_2.webp'
import ep3 from '../../asset/img/example_product_3.webp'
import Footer from '../../component/organization/Footer';
import ButtonWithText from '../../component/atom/ButtonWithText';

// react HTML
const ProductList = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState("poplular")
    const ProductClick = (productId, modelUrl, modelName) => {
        
        navigation.navigate('ProductDetail', {
            productId, // int
            modelUrl, // path
            modelName // name width depth height
        });
    }
    useEffect(() => {
        const init = async () => {
            let result = await getProduct();
            if (result.status == 'success'){
                let temp_list = result.data;
                // temp_list.pop();
                
                if (temp_list.length % 2 == 1) temp_list.push({id: -1, name:""})
                setProductList(temp_list);
                setLoading(true);
            } else {
                Alert.alert("상품 불러오기 실패", "상품을 불러오는데 실패하였습니다.")
            }
        }
        init();
    },[])
    const [productList, setProductList] = useState([]);
    const filteredProductList = () => {
        if (filter == "poplular")
            return productList.sort((a,b) => b.sell_count - a.sell_count);
        else if (filter == "new")
            return productList.sort((a,b) => Number(b.create_time.split(".")[0].replace(/-/g,"").replace("T","").replace(/:/g,"")) - Number(a.create_time.split(".")[0].replace(/-/g,"").replace("T","").replace(/:/g,"")));
        else if (filter == "margin")
            return productList.sort((a,b) => a.stock - b.stock);
        else
            return  productList;
    }
    return (
        <>
        <Container >
            {/* <Header navigation={navigation} title="상품 검색"/> */}
            <LogoWrapper>
                {/* <LogoSmallText>어디 밖에 매장</LogoSmallText> */}
                <LogoText>Angagu</LogoText>
            </LogoWrapper>
            <SearchInput
                value={query}
                onChangeText={setQuery}
                placeholder="상품명을 검색해주세요."
            />
            <ButtonWrapper>
                <FliterButton onPress={() => {setFilter("poplular")}} textColor={filter == "poplular" ? "#35BCD6" : "#000000"}>인기순</FliterButton>
                <FliterButton onPress={() => {setFilter("margin")}} textColor={filter == "margin" ? "#35BCD6" : "#000000"}>매진임박순</FliterButton>
                <FliterButton onPress={() => {setFilter("new")}} textColor={filter == "new" ? "#35BCD6" : "#000000"}>최신순</FliterButton>
            </ButtonWrapper>
            { loading &&
            <ProductWrapper
                columnWrapperStyle={{justifyContent:'space-between'}}
                data={filteredProductList().filter(product => product.name.includes(query))}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    item.id != -1 ?
                    <ProductBox onPress={() => {
                        
                        ProductClick(item.id, item["3d_model_url"], item["3d_model_name"] + " " + item["width"] + " " + item["depth"] + " " + item["height"])}}>
                        {/* <ProductImage source={require("https://angagu.s3.ap-northeast-2.amazonaws.com/" + item.image)}/> */}
                        {/* <ProductImage source={{uri: "https://angagu.s3.ap-northeast-2.amazonaws.com/product/desc/aUj2027nQa.png"}}/> */}
                        <ProductImage source={{uri: BACKEND_ASSET_URL + '/' + item.thumb_url}}/>
                        {/* <ProductImage source={ep1}/> */}
                        {/* <ProductBrand>{item.brand}</ProductBrand> */}
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>￦ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ProductPrice>
                        <Stars
                            display={3.67}
                            spacing={2}
                            count={5}
                            starSize={12}
                            fullStar= {require('../../asset/img/star_full.png')}
                            emptyStar= {require('../../asset/img/star_empty.png')}
                        />    
                    </ProductBox>
                    :
                    <ProductBox />
                )}
            />
            }
            
        </Container>
        <Footer navigation={navigation} route={route}/>
        </>
    )
}

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
    font-family: 'GmarketSansMedium';
`;
const ProductWrapper = styled.FlatList`
    flex: 1;
`
const SearchInput = styled(Input)`
    height: 40px;
    width: ${screenWidth - 40}px;
    margin: 10px 20px;
`
const ProductBox = styled.TouchableOpacity`
    flex: 1;
    width: ${(screenWidth) / 2}px;
    height: ${(screenWidth * 3 / 5)}px;
    border-right-width: 0.8px;
    border-bottom-width: 0.8px;
    border-color: #E7E7E7;
    padding: 10px 0px;
    align-items: center;
`
const ProductImage = styled.Image`
    flex: 1;
    width: ${(screenWidth - 81) / 2}px;
    height: ${(screenWidth - 81) / 2}px;
    margin-bottom: 13px;
    resize-mode: contain;
`
const ProductBrand = styled(Text)`
    font-weight: 800;   
`
const ProductName = styled(Text)`
    font-weight: 800;   
    font-size: 16px;
    margin: 4px;
`
const ProductPrice = styled(Text)`
    font-size: 12px;
`
const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
`
const FliterButton = styled(ButtonWithText)`
    
`
export default ProductList;

