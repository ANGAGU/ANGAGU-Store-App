import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

import Stars from 'react-native-stars';

// lib import
import styled from 'styled-components/native';
import InputWithText from '../../component/atom/InputWithText';
import ButtonWithText from '../../component/atom/ButtonWithText';
import Text from '../../component/atom/Text';
import Header from '../../component/organization/Header';
import { delReview, getReview, modifyReview, setReview } from '../../api/product/review';
export default ({navigation, route}) => {
    const [question, setQuestion] = useState("");
    const [star, setStar] = useState(5);
    const [loading, setLoading] = useState(false);
    const [reviewId, setReviewId] = useState(0);
    useEffect(() => {
        const myReview = async () => {
            const result = await getReview(route.params.orderId);
            setQuestion(result.data.content);
            setStar(result.data.star);
            setReviewId(result.data.id);
            setLoading(true);
        }
        if (route.params.type == "edit") {
            myReview();
        } else {
            setLoading(true);
        }
    }, [])
    const regist = async () => {
        const result = await setReview(route.params.orderId, star, question);
        if (result.status == "success"){
            route.params.callback();
            navigation.goBack();
        }
    }
    const edit = async () => {
        const result = await modifyReview(route.params.orderId, star, question, reviewId);
        if (result.status == "success"){
            route.params.callback();
            navigation.goBack();
        }
    }
    const del = async () => {
        const result = await delReview(route.params.orderId, reviewId);
        if (result.status == "success"){
            route.params.callback();
            navigation.goBack();
        }
    }
    return (
        <Container>
            <Header navigation={navigation} title="구매 후기"/>
            <QuestionBox>
                <QuestionInput multiline={true} inputStyle={{textAlignVertical: 'top', borderBottomWidth:0, height: 96}} label="후기 내용" value={question} onChangeText={setQuestion} placeholder="구매 후기를 입력해주세요."/>
                <QuestionAnnounce>주민번호, 전화번호, 이메일 등의 개인정보를 남기면 타인에 의해 도용될 수 있습니다. 개인 정보는 구매 후기에 남기지 말아주세요.</QuestionAnnounce>
            </QuestionBox>
            <StarLabel>
                별점
            </StarLabel>
            {loading && 
                <Stars
                    half={false}
                    default={star}
                    update={setStar}
                    spacing={8}
                    count={5}
                    starSize={24}
                    fullStar= {require('../../asset/img/star_full.png')}
                    emptyStar= {require('../../asset/img/star_empty.png')}
                />    
            }
            <SubLabel>
                클릭을 통해 별점을 선택해주세요!
            </SubLabel>
            <QuestionButton textColor="#F7F7F7" buttonColor="#35BCD6" onPress={route.params.type == "edit" ? edit : regist}>
                {route.params.type == "edit" ? "수정하기" : "등록하기"}
            </QuestionButton>
            {route.params.type == "edit"}
            <DeleteButton textColor="#E55555" onPress={del}>
                {"삭제하기"}
            </DeleteButton>
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
    margin: 20px 20px 0px;
`
const DeleteButton = styled(ButtonWithText)`
    margin: 10px 20px 0px;
`
const StarLabel = styled(Text)`
    font-size: 15px;
    padding: 20px; 
`
const SubLabel = styled(Text)`
    font-size: 12px;
    color: #666666;
    text-align: center;
    margin-top: 5px;
`