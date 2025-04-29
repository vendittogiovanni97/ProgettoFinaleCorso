import styled from "styled-components";

export const AvatarContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.primary};
  overflow: hidden;
  margin-bottom: 25px;
  transition: all 0.4s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px ${props => `${props.theme.colors.primary}66`};
  }
`;

export const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.colors.primary};
  overflow: hidden;
  margin-bottom: 25px;
  transition: all 0.4s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px ${props => `${props.theme.colors.primary}66`};
  }
`;