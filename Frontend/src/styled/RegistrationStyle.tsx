import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormContainer = styled.form`
  background: rgba(255, 215, 39, 0.85); // 85% di opacità
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow:
    0 0 25px rgba(255, 215, 0, 0.4),
    // Ombra più soft
    0 0 10px rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(4px); // Sfocatura leggera
  border: 1px solid rgba(255, 215, 0, 0.5); // Bordo più definito
  z-index: 1;
  width: 90%;
  max-width: 450px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 0 35px rgba(255, 215, 0, 0.5),
      0 0 15px rgba(255, 215, 0, 0.3);
    background: rgb(253, 219, 1); // Leggermente più opaco al hover
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  color: black;
  width: 100%;
  height: 2.5rem;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color: #ffd700;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordInput = styled(Input)`
  padding-right: 40px; // Spazio per l'icona
  width: 100%;
  margin: 5px 0px 5px 0px; // Spazio per l'icona
  height: 2.5rem;
`;
