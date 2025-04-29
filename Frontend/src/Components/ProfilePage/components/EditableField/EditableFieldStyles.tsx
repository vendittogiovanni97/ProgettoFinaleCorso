import styled from "styled-components";

const EditableFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  .field-content {
    display: flex;
    align-items: center;
    gap: 15px;
    color: ${props => props.theme.colors.textLight};
    flex-grow: 1;

    svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  input {
    flex-grow: 1;
    padding: 10px;
    background: transparent;
    border: 1px solid ${props => `${props.theme.colors.primary}4d`};
    color: ${props => props.theme.colors.textLight};
    border-radius: 6px;
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 10px ${props => `${props.theme.colors.primary}4d`};
    }
  }

  .edit-icon {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;
export default EditableFieldContainer;