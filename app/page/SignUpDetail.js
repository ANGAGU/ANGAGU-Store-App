// react import
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

// lib import
import Header from '../component/organization/Header';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';
import InputWithText from '../component/atom/InputWithText';

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [checkPassword, setCheckPassword] = useState("");

    const requestSignUp = () => {
        navigation.navigate("SignIn")
    }

    return (
        <Container>
            <Header navigation={navigation} title="회원가입"/>
            <FormWrapper>
                <FormInput
                    label={'이메일'}
                    placeholder={'이메일을 입력해주세요'}
                    value={email}
                    onChangeText={setEmail}
                />
                <FormInput
                    label={'비밀번호'}
                    placeholder={'비밀번호를 입력해주세요'}
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <FormInput
                    label={'이름'}
                    placeholder={'이름을 입력해주세요'}
                    value={email}
                    onChangeText={setEmail}
                />
                <FormInput
                    label={'생년월일'}
                    placeholder={'19000101'}
                    value={email}
                    onChangeText={setEmail}
                />
                {/* <FormInput
                    label={'비밀번호 확인'}
                    placeholder={'example@abc.com'}
                    value={checkPassword}
                    onChangeText={setCheckPassword}
                /> */}
                
                <FormButton
                    buttonColor={"#35BCD6"}
                    textColor="#ffffff"
                    onPress={requestSignUp}>
                    {'회원가입'}
                </FormButton>
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
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  width: 100%;
`;
const FormButton = styled(ButtonWithText)`
  margin-top: 5px;
  width: 100%;
`;
