import styled from 'styled-components/native';

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#A8A8A8',
})`
  background-color: #f4f4f5;
  padding: 10px 10px;
  color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  font-size: 17px;
`;

export default Input;
