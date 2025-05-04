import styled from "styled-components";

const ProfileSidebar = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 32px 24px;
  border-radius: 16px 0 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  min-height: 100%;
  transition: background 0.3s, color 0.3s;
  border-right: 2px solid ${props => props.theme.colors.primary}; // or another theme color
`;


export default ProfileSidebar;