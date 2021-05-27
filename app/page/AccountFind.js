import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../component/atom/InputWithText'
import ButtonWithText from '../component/atom/ButtonWithText'
import {formatEmail} from '../util/format';
export default AccountFind = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const findID = () => {
        //api
    }
    // 핸드폰 번호의 format 을 맞춘다.
    const formatPhone = (phoneNumber) => {
        if (phoneNumber.length > 7) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4);
        else if (phoneNumber.length > 3) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) 
        else return phoneNumber;
    }
    
    return (
        <Container>
            <FormWrapper>
                <FormInput
                    label={'이메일'}
                    placeholder={'example@ajou.ac.kr'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <FormInput
                    label={'휴대전화'}
                    placeholder={'010-0000-0000'}
                    value={formatPhone(phone)}
                    onChangeText={(e) => setPhone(e.replace(/-/g, ""))}
                    keyboardType="numeric"
                />
                <FormButton
                    buttonColor={formatEmail(email) == true && phone.length > 10 ? "#35BCD6" : "#E7E7E7"}
                    textColor="#ffffff"
                    onPress={findID}
                >
                    {'아이디 찾기'}
                </FormButton>
            </FormWrapper>
        </Container>
    )
}

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
const FormWrapper = styled.ScrollView`
    padding: 20px 30px 0px;
`
const FormInput = styled(InputWithText)`
  margin-bottom: 15px;
  font-size: 15px;
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  width: 100%;
`;

const FormButton = styled(ButtonWithText)`
  margin-top: 5px;
  width: 100%;
`;