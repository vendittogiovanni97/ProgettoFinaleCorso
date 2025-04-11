import styled from "styled-components";

export const AttachmentWrapper = styled.div`
  position: absolute;
  display: flex;
`;

export const AttachmentMenuContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  background: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 160px;
  z-index: 100;
  overflow: hidden;
`;

export const AttachmentMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  color: var(--text-light);

  &:hover {
    background: var(--hover-color);
  }
`;

export const AttachmentIcon = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;
