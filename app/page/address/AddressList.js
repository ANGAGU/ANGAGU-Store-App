import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert } from 'react-native';
import { getAddress, getDefaultAddress, setDefaultAddress } from '../../api/address/address';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
export default ({navigation, route}) => {

    const [addressList, setAddressList] = useState([]);
    const [defaultId, setDefaultId] = useState(0);
    const getAddressFunc = async () => {
        const address = await getAddress();
        setAddressList(address.data);
    }
    const selectAddress = async (id) => {
        const result = await setDefaultAddress(id);
        route.params.callback();
        navigation.goBack();
    }
    useEffect(() => {
        (async () => {
            const address = await getAddress();
            setAddressList(address.data);

            const defaultAddressId = await getDefaultAddress();
            setDefaultId(defaultAddressId.data[0].address_id);
        })()
    },[])
    
    return (
        <Container>
            <Header navigation={navigation} title="배송지 정보"/>
            {/* 
            {
                recipient:string,
                road:string,
                land:string,
                detail:string,
            }
            */}
            <FormWrapper>
                {addressList.map( (address, key) => {
                    return (
                        <FormInner onPress={() => selectAddress(address.id)} imageMode={true} border={address.id == defaultId ? true : false} key={key}>
                            <FormRow>
                                {/* <DeleteButton fontSize="24px" textColor="#E77777">
                                    ×
                                </DeleteButton> */}
                                <FormGrid>
                                    <FormName >{address.recipient}</FormName>
                                    <FormLabel >{address.road}, {address.detail}</FormLabel>
                                </FormGrid>
                            </FormRow>
                            <FormGrid>
                                <FormRow>
                                    <FormButton
                                        onPress={()=> {navigation.navigate("AddressWrite", 
                                        {
                                            mode: "edit",
                                            id: address.id,
                                            recipient: address.recipient,
                                            road: address.road,
                                            detail: address.detail,
                                            callback: getAddressFunc
                                        })}}
                                    >
                                        수정
                                    </FormButton>
                                    {/* <FormButtonFill
                                        textColor="#E7E7E7"
                                        onPress={()=> {navigation.goBack()}}
                                    >
                                        선택
                                    </FormButtonFill> */}
                                </FormRow>
                            </FormGrid>
                        </FormInner>
                    )
                })}
                
            </FormWrapper>
            <AddButton
                onPress={()=> {navigation.navigate("AddressWrite", {mode: "add", id: -1})}}
                buttonColor="#35BCD6"
                textColor="#ffffff"
            >
                추가
            </AddButton>
            
        </Container>
    )
}

const Container = styled.View`
    background: #EEEEEE;
    flex: 1;
`;

const FormWrapper = styled.ScrollView`
    padding: 0px 0px 0px;
    background-color: #EEEEEE;
`
const FormName = styled(Text)`
    font-size: 16px;
    margin-bottom: 5px;
`
const FormLabel = styled(Text)`
    font-size: 12px;
    color: #777777;
`
const FormRow = styled.View`
    flex-direction: row;
`
const FormButton = styled(ButtonWithText)`
    padding: 16px;
    border: 1px solid #E7E7E7;
`
const FormButtonFill = styled(ButtonWithText)`
    padding: 16px;
    border: 1px solid #E7E7E7;
    background: #35BCD6;
    margin-left: 5px;
`
const FormInner = styled(ButtonWithText)`
    flex-direction: row;
    justify-content: space-between;
    background: #FEFEFE;
    padding: 20px;
    border: 1px solid #E1E1E1;
    margin: 5px 10px 0px;
    border-radius: 5px;
    ${({border = false}) =>
    border &&
    css`
      border: 2px solid #35BCD6;
    `};
`
const FormGrid = styled.View`

`
const AddButton = styled(ButtonWithText)`
    height: 45px;
    border-radius: 5px;
    margin: 10px;
`
const DeleteButton = styled(ButtonWithText)`
`