import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, black, #333333);
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
`;

export const Button2 = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #000000;
  color: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
`;

export const FormContainer = styled.div`
  background-color: #ffd700;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 300px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
export const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const PasswordButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: black;
  border: none;
  border-radius: 0 5px 5px 0;
  color: white;
  padding: 0 10px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
