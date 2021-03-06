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
                    Alert.alert("????????? ????????? ???????????? ????????????.");
                }
            } else {
                Alert.alert("????????? ??????????????? ???????????? ????????????.");
            }
        }
        //api
    }
    const changePw = async () => {
        
        const result = await findPwAPI(password, passwordToken);
        console.log(passwordToken);
        console.log(result);
        if (result.status == "success"){
            Alert.alert("???????????? ?????? ??????", "??????????????? ??????????????? ?????????????????????.")
            navigation.navigate("SignIn")
        }
    }
    // ????????? ????????? format ??? ?????????.
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
            <Header navigation={navigation} title="?????????/???????????? ??????"/>
            <FormWrapper>
                <SelectWrapper>
                    <SelectButton
                        buttonColor={!selectPw ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={() => setSelectPw(false)}
                    >
                        {'????????? ??????'}
                    </SelectButton>
                    <SelectButton
                        buttonColor={selectPw ? "#35BCD6" : "#E7E7E7"}
                        textColor="#ffffff"
                        onPress={() => setSelectPw(true)}
                    >
                        {'???????????? ??????'}
                    </SelectButton>
                </SelectWrapper>
                {showResult == false  ?
                <>
                <FormInput
                    label={'??????'}
                    placeholder={'?????????'}
                    value={name}
                    onChangeText={setName}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                { selectPw && 
                <FormInput
                    label={'?????????'}
                    placeholder={'example@ajou.ac.kr'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                }
                <FormInput
                    label={'????????????'}
                    placeholder={'010-0000-0000'}
                    value={formatPhone(phone)}
                    onChangeText={(e) => setPhone(e.replace(/-/g, ""))}
                    keyboardType="numeric"
                />
                { smsSend &&
                    <FormInput
                        label={'????????????'}
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
                        {selectPw ? '???????????? ??????' : '????????? ??????'}
                    </FormButton>
                </>
                :
                    <ResultWrapper>                    
                        {!selectPw ?
                        <>
                            <ResultText>
                                ???????????? ????????? ????????? ????????????.
                            </ResultText>
                            <ResultRichText>
                                {resultId}
                            </ResultRichText>
                        </>
                        :
                        <>
                            <ResultRichText>
                                ????????? ??????????????? ??????????????????.
                            </ResultRichText>
                            <FormInput
                                label={'??? ????????????'}
                                placeholder={'??????????????? ??????????????????'}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                onBlur={() => setPasswordMessage(true)}
                                errorLabel={(!formatPassword(password) && passwordMessage) ? "??????, ??????, ??????????????? ????????? 8~15??????" : ""}
                            />
                            <FormInput
                                label={'??? ???????????? ??????'}
                                placeholder={'??????????????? ??????????????????'}
                                value={passwordCheck}
                                secureTextEntry
                                onChangeText={setPasswordCheck}
                                onBlur={() => setPasswordCheckMessage(true)}
                                errorLabel={(password != passwordCheck && passwordCheckMessage) ? "??????????????? ???????????? ????????????." : ""}
                            />
                            <FormButton
                                buttonColor={ formatPassword(password) && password == passwordCheck ? "#35BCD6" : "#E7E7E7"}
                                textColor="#ffffff"
                                onPress={changePw}
                            >
                                {'???????????? ??????'}
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