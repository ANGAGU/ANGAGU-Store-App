import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert } from 'react-native';
import { getAddress } from '../../api/address/address';
export default ({navigation}) => {

    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        (async () => {
            const address = await getAddress();
            setAddressList(address.data);
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
                {addressList.map( (address) => {
                    return (
                        <FormInner>
                            <FormGrid>
                                <FormName >{address.recipient}</FormName>
                                <FormLabel >{address.road + " " + address.detail}</FormLabel>
                            </FormGrid>
                            <FormGrid>
                                <FormButton
                                    onPress={()=> {navigation.navigate("AddressWrite", {mode: "edit"})}}
                                >
                                    수정
                                </FormButton>
                            </FormGrid>
                        </FormInner>
                    )
                })}
                
            </FormWrapper>
            <AddButton
                onPress={()=> {navigation.navigate("AddressWrite", {mode: "add"})}}
                buttonColor="#35BCD6"
                textColor="#ffffff"
            >
                추가
            </AddButton>
            
        </Container>
    )
}

const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
`;

const FormWrapper = styled.ScrollView`
    padding: 0px 0px 0px;
`
const FormName = styled(Text)`
    font-size: 18px;
`
const FormLabel = styled(Text)`
    font-size: 15px;
    color: #777777;
`

const FormButton = styled(ButtonWithText)`
    padding: 16px;
    border: 1px solid #E7E7E7;
`
const FormInner = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    border-bottom-color: #E7E7E7;
    border-bottom-width: 1px;
`
const FormGrid = styled.View`

`
const AddButton = styled(ButtonWithText)`
    border: 1px solid #E7E7E7;
    margin: 20px;
`