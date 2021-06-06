import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText'
import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'
import Header from '../../component/organization/Header';
import {changePw} from '../../api/auth/editAccount.js'
import { Alert } from 'react-native';

export default ({navigation}) => {
    const [pw, setPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const changePassword = async () => {
        const result = await changePw(pw, newPw);
        if (result.status == "success")
        {
            Alert.alert("비밀번호 변경 성공", "비밀번호가 성공적으로 변경되었습니다.")
            navigation.goBack();
        } else {
            Alert.alert("비밀번호 변경 실패", result.message);
        }
    }
    return (
        <Container>
            <Header navigation={navigation} title="개인정보 변경"/>
            <Wrapper>
                <CurrentPassword value={pw} onChangeText={setPw} secureTextEntry label="현재 비밀번호" placeholder="현재 비밀번호"/>
                <NewPassword value={newPw} onChangeText={setNewPw} secureTextEntry label="새 비밀번호" placeholder="새 비밀번호"/>
                <ChangeButton textColor="#FFFFFF" buttonColor="#35BCD6" onPress={changePassword}>비밀번호 변경</ChangeButton>
            </Wrapper>
        </Container>
    )
}

const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;
const Wrapper = styled.View`
    background-color: #fefefe;
    margin: 10px;
    padding: 20px;
    border: 1px solid #E7E7E7;
    border-radius: 10px;
`
const CurrentPassword = styled(InputWithText)`

`

const NewPassword = styled(InputWithText)`

`
const ChangeButton = styled(ButtonWithText)`
    
`