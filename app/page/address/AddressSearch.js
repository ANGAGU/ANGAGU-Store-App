import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

import ButtonWithText from '../../component/atom/ButtonWithText'
import Text from '../../component/atom/Text'

import Header from '../../component/organization/Header';
import Postcode from '@actbase/react-daum-postcode';
import { View } from 'react-native';


export default ({navigation, route}) => {

    return (
        <Container>
            <Header navigation={navigation} title={ "주소 검색" }/>
                <View style={{flex: 1}}>
                    <PostContainer
                        jsOptions={{ animated: true }}
                        onSelected={data => {route.params.callback(data.roadAddress)}}
                    />
                </View>

        </Container>
    )
}

const Container = styled.View`
    background: #EEEEEE;
    flex: 1;
`;

const FormWrapper = styled.ScrollView`
    padding: 0px 0px;
    background: #EEEEEE;
`
const FormView = styled.View`
    margin: 0px 10px;
`
const FormButton = styled(ButtonWithText)`
    border-bottom-width: 1px;
    padding: 16px;
    border-bottom-color: #E7E7E7;
`
const Label = styled(Text)`
    font-size: 16px;
    margin: 10px 0px;
`
const Value = styled(Text)`
    margin: 5px 5px 10px;
    color: #777777;
`
const LabelWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
const AddButton = styled(ButtonWithText)`
    height: 45px;
    border-radius: 5px;
    margin: 10px;
`
const PostContainer  = styled(Postcode)`
    width: 100%;
    height: 100%;
`
