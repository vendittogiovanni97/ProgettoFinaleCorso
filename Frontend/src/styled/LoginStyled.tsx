import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #000000, #1a1a1a);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 215, 0, 0.15) 0%,  // Opacità ridotta a 0.15
      transparent 70%               // Effetto più diffuso
    );
    animation: rotate 15s linear infinite;
    z-index: 0;
    filter: brightness(0.8);       // Luminosità bilanciata
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Media query per schermi più piccoli */
  @media (max-width: 768px) {
    align-items: flex-start;
    padding-top: 120px; /* Spazio per l'header rimpicciolito */
  }
`;

export const FormContainer = styled.div`
  background: rgba(255, 215, 39, 0.85); // 85% di opacità
  padding: 3rem;  // Increased from 2.5rem
  border-radius: 1.2rem;  // Increased from 1rem
  box-shadow:
    0 0 25px rgba(255, 215, 0, 0.4),
    // Ombra più soft
    0 0 10px rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(4px); // Sfocatura leggera
  border: 1px solid rgba(255, 215, 0, 0.5); // Bordo più definito
  width: 95%;  // Increased from 90%
  max-width: 500px;  // Increased from 450px
  transition: all 0.3s ease;
  position: relative; /* Mantiene il posizionamento corretto */
  z-index: 1; /* Valore base per il form container */

  &:hover {
    box-shadow:
      0 0 35px rgba(255, 215, 0, 0.5),
      0 0 15px rgba(255, 215, 0, 0.3);
    background: rgb(253, 219, 1); // Leggermente più opaco al hover
  }

  /* Media query per schermi più piccoli */
  @media (max-width: 768px) {
    padding: 2rem;
    width: 90%;
    margin-top: 20px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 1.2rem;  // Increased from 1rem
  padding: 0.6rem;  // Increased from 0.5rem
  border-radius: 5px;
  border: 1px solid #ccc;
  color: black;
  height: 2.8rem;  // Increased from 2.5rem
  font-size: 1.05rem;  // Added font size
`;

export const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 1.2rem;  // Increased from 1rem
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 0.6rem;  // Increased from 0.5rem
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 2.8rem;  // Increased from 2.5rem
  font-size: 1.05rem;  // Added font size
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.85rem;  // Increased from 0.75rem
  margin-top: 1.2rem;  // Increased from 1rem
  border-radius: 6px;  // Increased from 5px
  border: none;
  background-color: #000000;
  color: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;  // Increased from 1rem
`;

export const Button2 = styled.button`
  width: 100%;
  padding: 0.85rem;  // Increased from 0.75rem
  margin-top: 1.2rem;  // Increased from 1rem
  border-radius: 6px;  // Increased from 5px
  border: none;
  background-color: #000000;
  color: #ffcc00;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;  // Increased from 1rem
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

export const HeaderContainer = styled.div`
  position: fixed; /* Cambiato da absolute a fixed per mantenere la posizione durante lo scroll */
  top: 80px;
  left: 60px;
  z-index: 10; /* Valore molto alto per garantire che sia sopra tutto */
  width: auto;
  transition: all 0.3s ease;
  
  /* Media query per schermi più piccoli */
  @media (max-width: 768px) {
    top: 20px;
    left: 20px;
    transform: scale(0.7);
    transform-origin: left top;
  }
`;


export const PasswordVisibilityWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5 px;
  height: 100%;
  background-color: transparent;
  border: none;
  transition: all 0.2s ease;
  
`;
