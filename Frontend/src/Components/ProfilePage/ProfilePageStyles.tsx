import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 60px 20px;
  justify-content: center;
  align-items: center;
  font-family: "Inter", "Arial", sans-serif;
  background-image: url(/pics/image1.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  background: #1a1a1a;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  max-height: 1200px;
`;

export const H2Style = styled.div`
  color: ${props => props.theme.colors.textLight};
`;