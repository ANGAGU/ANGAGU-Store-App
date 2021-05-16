import styled, {css} from 'styled-components/native';

export function getLineHeight(fontSize) {
  const multiplier = 1.45;
  return parseInt(fontSize * multiplier, 10);
}

const Text = styled.Text`
  ${({fontSize}) =>
    fontSize &&
    css`
      line-height: ${getLineHeight(fontSize)}px;
    `
  };
  ${({fontWeight}) =>
    fontWeight &&
    css`
      text-weight: ${fontWeight}px;
    `
  };
  letter-spacing: -1px;
`;

export default Text;
