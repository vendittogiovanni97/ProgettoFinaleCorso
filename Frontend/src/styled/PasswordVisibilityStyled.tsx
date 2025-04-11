import styled from "styled-components";

const Button = styled.button`
  width: 40px;
  height: 35px;
  border-radius: 4px;
  border: none;
  background-color: white;
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 9px;
  &:hover {
    background-color: white;
  }
`;

export default Button;
