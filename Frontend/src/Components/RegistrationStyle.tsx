import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.form`
  background-color: #ffd700;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 300px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;