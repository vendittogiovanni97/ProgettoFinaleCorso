import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FormContainer = styled.form`
  background: rgba(255, 215, 39, 0.85);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow:
    0 0 25px rgba(255, 215, 0, 0.4),
    0 0 10px rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 215, 0, 0.5);
  z-index: 1;
  width: 90%;
  max-width: 450px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow:
      0 0 35px rgba(255, 215, 0, 0.5),
      0 0 15px rgba(255, 215, 0, 0.3);
    background: rgba(253, 219, 1, 0.95);
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  color: black;
  width: 100%;
  height: 2.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ffd700;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
`;

export const Button = styled.button`
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: #ffd700;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffb700;
    color: black;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: bold;
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordInput = styled(Input)`
  padding-right: 40px;
  margin: 0;
`;
