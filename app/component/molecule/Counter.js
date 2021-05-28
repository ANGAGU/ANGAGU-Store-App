import React from 'react';
import styled from 'styled-components/native';
import ButtonWithText from '../atom/ButtonWithText'
import Text from '../atom/Text'

export default ({min, max, value, setValue}) => {
    const changeValue = (c) => {
        if (value + c >= min && value + c <= max)
            setValue( value + c );
    }
    
    return (
        <CounterWrapper>
            <CountButton fontWeight={800} fontSize="16px" textColor="#000000" onPress={() => changeValue(-1)}>{'－'}</CountButton>
            <CountText>{value}</CountText>
            <CountButton fontWeight={800} fontSize="16px" textColor="#000000" onPress={() => changeValue(1)}>{'＋'}</CountButton>
        </CounterWrapper>
    )
}

const CounterWrapper = styled.View`
    width: 122px;
    flex-direction: row;
    align-items: center;
    border: 1px solid #A7A7A7;
    border-radius: 5px;
    margin: 10px 0px;
`
const CountButton = styled(ButtonWithText)`
    height: 32px;
    width: 40px;
    padding: 0px;
`
const CountText = styled(Text)`
    width: 40px;
    text-align: center;
`