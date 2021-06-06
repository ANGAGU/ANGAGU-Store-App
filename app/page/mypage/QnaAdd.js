import React, {useEffect, useState} from 'react';
import {

} from 'react-native';

// lib import
import styled from 'styled-components/native';

export default () => {
    return (
        <Container>
            <QuestionBox>
                <QuestionInput>
                    
                </QuestionInput>
            </QuestionBox>
        </Container>
    )
}

// react CSS
const Container = styled.View`
  background-color: #eeeeee;
  flex: 1;
`;
const QuestionBox = styled.View`

`

const QuestionInput = styled(InputWithText)`
    margin: 20px;
`

const QuestionButton = styled(ButtonWithText)`

`