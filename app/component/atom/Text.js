import styled, {css} from 'styled-components/native';

export function getLineHeight(fontSize) {
  const multiplier = 1.45;
  return parseInt(fontSize * multiplier, 10);
}

export const textStyles = css`
  font-family: 'NotoSansKR-Regular';
`;

const Text = styled.Text`
  ${textStyles}
  ${({fontSize}) =>
    fontSize &&
    css`
      line-height: ${getLineHeight(fontSize)}px;
    `};
`;

export default Text;
