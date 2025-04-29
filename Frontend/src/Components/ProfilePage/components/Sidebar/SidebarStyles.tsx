import styled from "styled-components";

const ProfileSidebar = styled.div`
  background: ${props => `${props.theme.colors.primary}0d`};
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${props => `${props.theme.colors.primary}1a`};
`;
export default ProfileSidebar;