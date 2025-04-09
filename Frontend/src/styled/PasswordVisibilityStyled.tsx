import styled from "styled-components";

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  &:hover {
    background-color: #333;
  }
`;

export default Button;
