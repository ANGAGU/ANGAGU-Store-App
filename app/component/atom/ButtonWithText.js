import React from 'react';
import styled, { css } from 'styled-components/native';

const ButtonWithText = ({
  style,
  children,
  onPress,
  textColor,
  buttonColor,
  fontSize,
  textDecoration,
}) => {
  return (
    <Button style={style} onPress={onPress} buttonColor={buttonColor}>
      <ButtonInnerText
        textDecoration={textDecoration}
        textColor={textColor}
        fontSize={fontSize}>
        {children}
      </ButtonInnerText>
    </Button>
  );
};

export default ButtonWithText;

const Button = styled.TouchableOpacity`
  ${({ buttonColor = '#ffffff' }) => buttonColor && css`
    background-color: ${buttonColor};
  `};
  padding: 13px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonInnerText = styled.Text`
  ${({ textDecoration  = 'none' }) => textDecoration && css`
    text-decoration-line: ${textDecoration};
  `};
  ${({ fontSize = '18px' }) => fontSize && css`
    font-size: ${fontSize};
  `};
  ${({ textColor = '#35BCD6' }) => textColor && css`
    color: ${textColor};
  `};
`;