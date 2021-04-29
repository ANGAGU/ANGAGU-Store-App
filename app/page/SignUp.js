// react import
import React, {useEffect, useState} from 'react';

// lib import
import styled from 'styled-components/native';
import Header from '../component/organization/Header';

const SignUp = ({navigation}) => {
    return (
        <Container>
            <Header navigation={navigation} title="회원가입"/>
        </Container>
    )
}

export default SignUp;

// react CSS
const Container = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

