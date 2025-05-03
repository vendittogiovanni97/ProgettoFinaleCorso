import styled from "styled-components";

export const AmiciPageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--background-light);
`;

export const AmiciDrawer = styled.div`
  width: 240px;
  background-color: var(--background-light);
  color: var(--text-light);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

export const AmiciDrawerTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 32px 24px 16px 24px;
  color: var(--primary-color);
`;

export const AmiciDrawerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
`;

export const AmiciDrawerItem = styled.button<{ $selected?: boolean }>`
  background: ${({ $selected }) => $selected ? "var(--primary-color)" : "transparent"};
  color: ${({ $selected }) => $selected ? "var(--text-dark)" : "var(--text-light)"};
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 4px;

  &:hover {
    background: var(--hover-color);
    color: var(--primary-color);
  }
`;

export const AmiciMain = styled.div`
  flex: 1;
  padding: 40px 32px;
  background-color: var(--background-light);
  color: var(--text-light);
  overflow-y: auto;
`;

export const AmiciSectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--primary-color);
`;

export const AmiciList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AmiciListItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AmiciSearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
`;

export const AmiciSearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--background-dark);
  color: var(--text-light);
  font-size: 1rem;
  flex: 1;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const AmiciButton = styled.button`
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  background: var(--primary-color);
  color: var(--text-dark);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--hover-color);
    color: var(--primary-color);
  }
`;