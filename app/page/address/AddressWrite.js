import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import Postcode from '@actbase/react-daum-postcode';
import { Alert, Button, Modal, View } from 'react-native';
import { setAddress as addAddress, modifyAddress } from '../../api/address/address';

export default ({navigation, route}) => {
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [detail, setDetail] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const edit = async () => {
        let result = await modifyAddress(route.params.id, name, address, detail);
        if (result.status == "success")
        {
            route.params.callback();
            navigation.navigate("AddressList")
        }
            
    }
    const add = async () => {
        let result = await addAddress(name, address, detail);
        if (result.status == "success"){
            route.params.callback();
            navigation.navigate("AddressList")
        }
        
    }
    useEffect(() => {
        (async () => {
            if (route.params.id != -1) {
                // const address = await getAddressById(route.params.id);
                setName(route.params.recipient)
                setAddress(route.params.road)
                setDetail(route.params.detail)
                // setAddressList(address.data);
            }
        })()
    },[])
    return (
        <Container>
            <Header navigation={navigation} title={ route.params.mode == "edit" ? "배송지 수정" : "배송지 추가"}/>
            <FormWrapper>
                <FormView>
                    <FormBox>
                        <Input label="수취인" value={name} onChangeText={setName}/>
                    </FormBox>
                    <FormBox>
                        <LabelWrapper>
                            <Label>주소</Label>
                            <ButtonWithText onPress={() => navigation.navigate("AddressSearch", {callback : setAddress})}>입력</ButtonWithText>
                        </LabelWrapper>
                        <Value>{address == "" ? "주소를 입력해주세요." : address}</Value>
                    </FormBox>
                    <FormBox>
                        <Input label="상세 주소" value={detail} onChangeText={setDetail}/>
                    </FormBox>
                </FormView>
            </FormWrapper>
            <AddButton
                onPress={route.params.mode == "edit" ? edit : add}
                buttonColor="#35BCD6"
                textColor="#ffffff"
            >
                {route.params.mode == "edit" ? "수정하기" : "추가하기"}
            </AddButton>
        </Container>
    )
}

const Container = styled.View`
    background: #EEEEEE;
    flex: 1;
`;

const FormWrapper = styled.ScrollView`
    padding: 0px 0px;
    background: #EEEEEE;
`
const FormView = styled.View`
    margin: 0px 10px;
`
const FormButton = styled(ButtonWithText)`
    border-bottom-width: 1px;
    padding: 16px;
    border-bottom-color: #E7E7E7;
`
const Label = styled(Text)`
    font-size: 16px;
    margin: 10px 0px;
`
const Value = styled(Text)`
    margin: 5px 5px 10px;
    color: #777777;
`
const LabelWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const AddButton = styled(ButtonWithText)`
    height: 45px;
    border-radius: 5px;
    margin: 10px;
`
const PostContainer  = styled(Postcode)`
    width: 100%;
    height: 100%;
`
const FormBox = styled.View`
    border: 1px solid #E7E7E7;
    margin: 10px 0px 0px;
    padding: 8px 16px;
    border-radius: 10px;
    background: #FEFEFE;
`
const Input = styled(InputWithText)`
    margin-bottom: 40px;
`