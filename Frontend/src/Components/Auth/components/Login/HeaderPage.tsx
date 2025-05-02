import { useState } from "react";
import styled from "styled-components";

const WelcomeText = styled.h1`
  position: absolute;
  display: flex-shrink;
  align-items: center;
  left: 7%;
  z-index: 10;
  font-size: 60px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  animation: pulse 2s infinite;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 30px;
    left: 28%;
    top: 28px;
  }

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const TitleText = styled.h2<{ isClicked: boolean }>`
  position: absolute;
  top: 45%;  
  left: 5%;
  z-index: 10;
  font-size: 100px;
  font-weight: 800;
  color: #ffd700;
  transition: all 0.3s ease-in-out;
  transform: ${(props) => (props.isClicked ? "scale(1.25)" : "scale(1)")};
  transform-origin: left center;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 40px;
    left: 28%;
    top: 45px;
  }
  
  &:hover {
    color: white;
    text-shadow: 0 0 25px rgba(255, 215, 0, 0.9);
    animation: bounce 0.5s infinite alternate;
  }

  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
  }
`;

export default function HeaderPage({ title = "DROCSID" }) {
  const [welcomeClicked, setWelcomeClicked] = useState(false);

  const handleWelcomeClick = () => {
    setWelcomeClicked(!welcomeClicked);
  };

  return (
    <>
      <WelcomeText onClick={handleWelcomeClick}>WELCOME TO</WelcomeText>
      <TitleText isClicked={welcomeClicked} onClick={handleWelcomeClick}>
        {title}
      </TitleText>
    </>
  );
}
