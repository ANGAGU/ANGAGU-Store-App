import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

export default AccountFind = ({navigation}) => {
    const [phone, setPhone] = useState('')
    // 핸드폰 번호의 format 을 맞춘다.
    const formatPhone = (phoneNumber) => {
        if (phoneNumber.length > 7) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4);
        else if (phoneNumber.length > 3) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) 
        else return phoneNumber;
    }
    
    return (
        <Container>
            <FormInput
                placeholder={'이메일'}
                value={email}
                onChangeText={onEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <FormInput
                label={'휴대전화'}
                placeholder={'010-0000-0000'}
                value={formatPhone(phone)}
                onChangeText={setPhone}
                keyboardType="numeric"
            />
            <FormButton
                buttonColor={phone.length > 10 ? "#35BCD6" : "#E7E7E7"}
                textColor="#ffffff"
                onPress={checkPhoneAuth}
            >
                {'인증번호 인증'}
            </FormButton>
        </Container>
    )
}

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

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