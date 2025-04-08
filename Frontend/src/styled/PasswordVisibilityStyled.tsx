import styled from 'styled-components';


const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #444;
  }
`;

export default Button;