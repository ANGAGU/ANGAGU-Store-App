// react import
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

// lib import
import Header from '../../component/organization/Header';
import Input from '../../component/atom/Input';
import ButtonWithText from '../../component/atom/ButtonWithText';
import InputWithText from '../../component/atom/InputWithText';

// local api import
import { signUpMessageRequest, signUpMessageResponse} from '../../api/auth/signUp';
import { Alert } from 'react-native';
const SignUp = ({navigation}) => {
    const [phone, setPhone] = useState("");             // 휴대폰 번호
    const [isRequest, setIsRequest] = useState(false);  // 인증번호 요청 여부
    const [auth, setAuth] = useState("");               // 인증번호
    const requestPhoneAuth = async () => {
        const result = await signUpMessageRequest(phone);
        console.log(result);
        if (result.status == "success")
            setIsRequest(true);
        else
            Alert.alert("인증번호 발송 실패", result.message);
    }
    const checkPhoneAuth = async () => {
        const result = await signUpMessageResponse(phone, auth)
        if (result.status == "success")
            navigation.navigate("SignUpDetail", {
                phoneToken: result.data.token,
                phoneNumber: phone
            });
        else 
            Alert.alert("인증번호 인증 실패", result.message);
    }
    // 핸드폰 번호의 format 을 맞춘다.
    const formatPhone = (phoneNumber) => {
        if (phoneNumber.length > 7) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4);
        else if (phoneNumber.length > 3) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) 
        else return phoneNumber;
    }

    // 핸드폰 번호 변수의 수정을 담당한다.
    const setPhoneNumber = (text) => {
        // 인증번호 미발송시 setPhone 적용
        if (!isRequest) 
            setPhone(text.replace(/-/gi, ''))
        // 인증번호 발송 후, 변경 시도에 대해 상태 초기화 적용
        else { 
            setPhone("");
            setIsRequest(false)
        }
    }
    return (
        <Container>
            <Header navigation={navigation} title="회원가입"/>
            <FormWrapper>
                <FormInput
                    label={'휴대전화'}
                    placeholder={'010-0000-0000'}
                    value={formatPhone(phone)}
                    onChangeText={setPhoneNumber}
                    keyboardType="numeric"
                />
                {!isRequest ? 
                    <FormButton
                        buttonColor={phone.length > 10 ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={requestPhoneAuth}>
                        {'인증번호 받기'}
                    </FormButton>
                :
                    <>
                        <FormInput
                            label={'인증번호'}
                            placeholder={'인증번호를 입력해주세요'}
                            value={auth}
                            keyboardType="numeric"
                            onChangeText={setAuth}
                        />
                        <FormButton
                            buttonColor={phone.length > 10 ? "#35BCD6" : "#E7E7E7"}
                            textColor="#ffffff"
                            onPress={checkPhoneAuth}>
                            {'인증번호 인증'}
                        </FormButton>
                    </>
                }
            </FormWrapper>
        </Container>
    )
}

export default SignUp;

// react CSS
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
