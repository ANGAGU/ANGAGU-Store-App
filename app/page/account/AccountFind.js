import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import {formatEmail, formatPassword} from '../../util/format';
import Header from '../../component/organization/Header';
import { Alert } from 'react-native';
import { findAuthPhone, findId as findIdAPI, findVeryInfo, findVeryPhone, findPw as findPwAPI } from '../../api/auth/findAccount';
export default AccountFind = ({navigation}) => {
    const [selectPw, setSelectPw] = useState(false)
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordMessage, setPasswordMessage] = useState(false);
    const [passwordCheckMessage, setPasswordCheckMessage] = useState(false);
    const [smsSend, setSmsSend] = useState(false)
    const [showResult, setShowResult] = useState(false);
    const [auth, setAuth] = useState(null)
    const [resultId, setResultId] = useState("");
    const [passwordToken, setPasswordToken] = useState("");
    const findId = async () => {
        //api
        if (smsSend == false){
            const result = await findAuthPhone(phone);
            if (result.status == "success")
                setSmsSend(true);
        } else {
            const result = await findIdAPI(phone, name, auth);
            setResultId(result.data.email);
            setShowResult(true);
        }
    }
    const findPw = async () => {
        if (smsSend == false){
            const result = await findAuthPhone(phone);
            if (result.status == "success")
                setSmsSend(true);
        } else {
            const result = await findVeryPhone(phone,auth);
            
            if (result.status == "success"){
                const result2 = await findVeryInfo(name,email,result.data.token);
                console.log(result2);
                if (result2.status == "success"){
                    setPasswordToken(result2.data.token);
                    setShowResult(true);
                }
                else {
                    Alert.alert("입력한 정보가 올바르지 않습니다.");
                }
            } else {
                Alert.alert("핸드폰 인증번호가 올바르지 않습니다.");
            }
        }
        //api
    }
    const changePw = async () => {
        
        const result = await findPwAPI(password, passwordToken);
        console.log(passwordToken);
        console.log(result);
        if (result.status == "success"){
            Alert.alert("비밀번호 변경 성공", "비밀번호가 성공적으로 변경되었습니다.")
            navigation.navigate("SignIn")
        }
    }
    // 핸드폰 번호의 format 을 맞춘다.
    const formatPhone = (phoneNumber) => {
        if (phoneNumber.length > 7) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) + '-' + phoneNumber.substr(7,4);
        else if (phoneNumber.length > 3) return phoneNumber.substr(0,3) + '-' +phoneNumber.substr(3,4) 
        else return phoneNumber;
    }
    useEffect(() => {
        setShowResult(false);
        setSmsSend(false);
    },[selectPw])
    return (
        <Container>
            <Header navigation={navigation} title="아이디/비밀번호 찾기"/>
            <FormWrapper>
                <SelectWrapper>
                    <SelectButton
                        buttonColor={!selectPw ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={() => setSelectPw(false)}
                    >
                        {'아이디 찾기'}
                    </SelectButton>
                    <SelectButton
                        buttonColor={selectPw ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={() => setSelectPw(true)}
                    >
                        {'비밀번호 찾기'}
                    </SelectButton>
                </SelectWrapper>
                {showResult == false  ?
                <>
                <FormInput
                    label={'이름'}
                    placeholder={'홍길동'}
                    value={name}
                    onChangeText={setName}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                { selectPw && 
                <FormInput
                    label={'이메일'}
                    placeholder={'example@ajou.ac.kr'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                }
                <FormInput
                    label={'휴대전화'}
                    placeholder={'010-0000-0000'}
                    value={formatPhone(phone)}
                    onChangeText={(e) => setPhone(e.replace(/-/g, ""))}
                    keyboardType="numeric"
                />
                { smsSend &&
                    <FormInput
                        label={'인증번호'}
                        placeholder={'000000'}
                        value={auth}
                        onChangeText={setAuth}
                        keyboardType="numeric"
                    />
                }
                
                    <FormButton
                    // formatEmail(email) == true &&
                        buttonColor={ phone.length > 10 ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={selectPw ? findPw : findId}
                    >
                        {selectPw ? '비밀번호 찾기' : '아이디 찾기'}
                    </FormButton>
                </>
                :
                    <ResultWrapper>                    
                        {!selectPw ?
                        <>
                            <ResultText>
                                회원님의 계정은 다음과 같습니다.
                            </ResultText>
                            <ResultRichText>
                                {resultId}
                            </ResultRichText>
                        </>
                        :
                        <>
                            <ResultRichText>
                                새로운 비밀번호를 설정해주세요.
                            </ResultRichText>
                            <FormInput
                                label={'새 비밀번호'}
                                placeholder={'비밀번호를 입력해주세요'}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                onBlur={() => setPasswordMessage(true)}
                                errorLabel={(!formatPassword(password) && passwordMessage) ? "영문, 숫자, 특수문자를 포함한 8~15자리" : ""}
                            />
                            <FormInput
                                label={'새 비밀번호 확인'}
                                placeholder={'비밀번호를 입력해주세요'}
                                value={passwordCheck}
                                secureTextEntry
                                onChangeText={setPasswordCheck}
                                onBlur={() => setPasswordCheckMessage(true)}
                                errorLabel={(password != passwordCheck && passwordCheckMessage) ? "비밀번호가 일치하지 않습니다." : ""}
                            />
                            <FormButton
                                buttonColor={ formatPassword(password) && password == passwordCheck ? "#35BCD6" : "#E7E7E7"}
                                textColor="#ffffff"
                                onPress={changePw}
                            >
                                {'비밀번호 변경'}
                            </FormButton>
                        </>
                        }
                    </ResultWrapper>
                }
            </FormWrapper>
        </Container>
    )
}

const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;
const SelectWrapper = styled.View`
    flex-direction: row;
    flex: 1;
    border-bottom-width: 1px;
    border-bottom-color: #E7E7E7;
    padding-bottom: 20px;
    margin-bottom: 10px;
`
const SelectButton = styled(ButtonWithText)`
    flex: 1;
    margin: 10px;
`
const FormWrapper = styled.ScrollView`
    padding: 20px 30px 0px;
`
const FormInput = styled(InputWithText)`
    flex: 1;
    margin: 0px;
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

const ResultWrapper = styled.View`
    padding: 10px 20px;
    margin-top: 10px;
    border: 1px solid #C7C7C7;
`
const ResultText = styled(Text)`
    margin: 10px 0px;
    font-size: 15px;
`
const ResultRichText = styled(Text)`
    margin: 10px 0px;
    font-size: 16px;
    font-weight: 700;
`