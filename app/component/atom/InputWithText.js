import React from 'react';
import styled from 'styled-components/native';
import Input from './Input'
import Text from './Text'

const InputWithText = ({
    value="",
    onChangeText="",
    label="",
    errorLabel="",
    placeholder="",
    enable=true,
    multiline=false,
    secureTextEntry=null,
    keyboardType="default",
    onBlur=null,
    inputStyle,
}) => {
    
    return (
        <InputBox>
            {/* 상단 설명 레이블 */}
            {label != "" && 
                <Label>
                    {label}
                </Label>
            }

            {/* Input */}
            <InputText 
                style={inputStyle}
                value={value}
                multiline={multiline}
                onChangeText={enable && onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                keyboardType={keyboardType}
                onBlur={onBlur}
            />

            {/* 하단 오류 레이블 */}
            {errorLabel != "" && 
                <ErrorLabel>
                    {errorLabel}
                </ErrorLabel>
            }
        </InputBox>
    )
}

export default InputWithText;

const InputBox = styled.View`
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
`
const InputText = styled(Input)`
    font-size: 15px;
    border-bottom-width: 1px;
    border-bottom-color: #999999;
    background-color: #ffffff;
    color: #121212;
`
const Label = styled(Text)`
    font-size: 15px;
    margin: 8px 0px;
`
const ErrorLabel = styled(Text)`
    font-size: 12px;
    margin: 4px 2px;
    color: #F70000;
`