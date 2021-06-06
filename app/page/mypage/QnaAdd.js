import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

// lib import
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import Header from '../../component/organization/Header';
import { setQna } from '../../api/product/qna';
export default ({navigation, route}) => {
    const [question, setQuestion] = useState("");
    const regist = async () => {
        const result = await setQna(route.params.productId, question);
        console.log(result);
        if (result.status == "success"){
            route.params.callback();
            navigation.goBack();
        }
            

    }
    return (
        <Container>
            <Header navigation={navigation} title="상품 문의"/>
            <QuestionBox>
                <QuestionInput multiline={true} inputStyle={{textAlignVertical: 'top', borderBottomWidth:0, height: 96}} label="문의 내용" value={question} onChangeText={setQuestion} placeholder="문의하실 내용을 입력해주세요."/>
                <QuestionAnnounce>주민번호, 전화번호, 이메일 등의 개인정보를 남기면 타인에 의해 도용될 수 있습니다. 개인 정보는 상품 문의에 남기지 말아주세요.</QuestionAnnounce>
            </QuestionBox>
            <QuestionButton onPress={regist}>
                등록하기
            </QuestionButton>
        </Container>
    )
}

// react CSS
const Container = styled.View`
    background-color: #eeeeee;
    flex: 1;
`;
const QuestionBox = styled.View`
    margin: 20px;
`

const QuestionInput = styled(InputWithText)`
    margin: 20px;
    
`
const QuestionAnnounce = styled(Text)`
    font-size: 12px;
    color: #888888;
`
const QuestionButton = styled(ButtonWithText)`
    border: 1px solid #35BCD6;
    margin: 0px 20px;
`