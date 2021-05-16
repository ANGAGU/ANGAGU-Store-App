// react import
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

// lib import
import Header from '../component/organization/Header';
import Input from '../component/atom/Input';
import ButtonWithText from '../component/atom/ButtonWithText';
import InputWithText from '../component/atom/InputWithText';

// local api import
import { signUp , signUpEmailCheck} from '../api/auth/signUp'
import { Alert, TextInput } from 'react-native';
const SignUp = ({route, navigation}) => {
    // variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");

    // ui check for email verification
    const [isEmail, setIsEmail] = useState(false);

    // check format
    const [emailFormat, setEmailFormat] = useState(false);
    const [birthFormat, setBirthFormat] = useState(false);
    const [passwordFormat, setPasswordFormat] = useState(false);

    // error message
    const [passwordMessage, setPasswordMessage] = useState(false);
    const [nameMessage, setNameMessage] = useState(false);
    const [birthMessage, setBirthMessage] = useState(false);

    // const [checkPassword, setCheckPassword] = useState("");

    const emailCheck = async () => {
        if (!emailFormat) return;
        const result = await signUpEmailCheck(email);
        if (result.status == 'success') {
            setIsEmail(true);
        }
        else
            Alert.alert("이메일 확인", result.message);
    }
    const requestSignUp = async () => {
        let token = route.params.phoneToken;
        let phoneNumber = route.params.phoneNumber;
        const result = await signUp(token, email, password, name, birth, phoneNumber)
        
        if (result.status == 'success')
            navigation.navigate('SignIn')
        else
            Alert.alert("회원가입 실패", result.message);
    }
    // email
    const onEmailChange = (email) => {
        
        // format check
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        
        if (regExp.test(email))
            setEmailFormat(true);
        else
            setEmailFormat(false);

        // email already checked
        if (isEmail == true)
            setIsEmail(false);
        setEmail(email);
    }

    // password
    const onPasswordChange = (password) => {
        const regExpPw = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (regExpPw.test(password))
            setPasswordFormat(true)
        else
            setPasswordFormat(false)
        setPassword(password);
    }
    
    const onBirthChange = (birth) => {
        birth = birth.replace(/-/g, "");
        if (birth.length == 8) setBirthFormat(true);
        else setBirthFormat(false);

        if (birth.length > 6) {
            setBirth(birth.substr(0,4) + '-' +birth.substr(4,2) + '-' + birth.substr(6,2));
        }
        else if (birth.length > 4) 
            setBirth(birth.substr(0,4) + '-' + birth.substr(4,2) )
        else
            setBirth(birth);
        
        
    }
    return (
        <Container>
            <Header navigation={navigation} title='회원가입'/>
            <FormWrapper>
                <FormInput
                    label={'이메일'}
                    placeholder={'이메일을 입력해주세요'}
                    value={email}
                    keyboardType="email-address"
                    onChangeText={onEmailChange}
                />
                
                {!isEmail ?
                    <FormButton
                        buttonColor={emailFormat ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={emailCheck}>
                        {'이메일 중복확인'}
                    </FormButton> 
                    :
                    <>
                    
                        <FormInput
                            label={'비밀번호'}
                            placeholder={'비밀번호를 입력해주세요'}
                            value={password}
                            secureTextEntry
                            onChangeText={onPasswordChange}
                            onBlur={() => setPasswordMessage(true)}
                            errorLabel={(!passwordFormat && passwordMessage) ? "비밀번호를 정확히 입력해주세요. (영문, 숫자, 특수문자를 포함한 8~15자리)" : ""}
                        />
                        <FormInput
                            label={'비밀번호 확인'}
                            placeholder={'example@abc.com'}
                            value={checkPassword}
                            onChangeText={setCheckPassword}
                        />
                        <FormInput
                            label={'이름'}
                            placeholder={'이름을 입력해주세요'}
                            value={name}
                            onChangeText={setName}
                            onBlur={() => setNameMessage(true)}
                            errorLabel={(name == "" && nameMessage) ? "이름을 정확히 입력해주세요." : ""}
                        />
                        <FormInput
                            label={'생년월일'}
                            placeholder={'YYYY-MM-DD'}
                            value={birth}
                            onChangeText={onBirthChange}
                            onBlur={() => setBirthMessage(true)}
                            errorLabel={(!birthFormat && birthMessage) ? "생년월일을 정확히 입력해주세요." : ""}
                            keyboardType="numeric"
                        />
                    
                    
                
                    <FormButton
                        buttonColor={(emailFormat && passwordFormat && birthFormat && name != "") ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={requestSignUp}>
                        {'회원가입'}
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
  background-color: #ffffff;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  width: 100%;
`;
const FormButton = styled(ButtonWithText)`
  margin-top: 5px;
  width: 100%;
`;
