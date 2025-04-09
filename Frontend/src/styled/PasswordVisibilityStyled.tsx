import styled from "styled-components";

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: white;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #444;
  }
`;

export default Button;
