import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert } from 'react-native';
export default ({navigation, route}) => {
    
    const [addressList, setAddressList] = useState([]);
    const [mode, setMode] = useState("");
    useEffect(() => {
        (async () => {
            const address = await getAddress();
            setAddressList(address.data);
        })()
    },[])
    return (
        <Container>
            <Header navigation={navigation} title={ route.params.mode == "edit" ? "배송기 수정" : "배송지 추가"}/>
            <FormWrapper>
                {addressList.map( (menu) => {
                    return <FormButton textColor="#000000">{menu.title}</FormButton>
                })}
            </FormWrapper>
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
const FormButton = styled(ButtonWithText)`
    border-bottom-width: 1px;
    padding: 16px;
    border-bottom-color: #E7E7E7;
`