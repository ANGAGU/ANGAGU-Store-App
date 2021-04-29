import styled from 'styled-components/native';
import {getLineHeight} from './Text';

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#A8A8A8',
})`
  background-color: #f4f4f5;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  font-size: 17px;
  /* font-family: 'NotoSansKR-Regular';
  line-height: ${getLineHeight(17)}px; */
`;

export default Input;
