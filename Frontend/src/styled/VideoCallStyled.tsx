import styled from "styled-components";
import {
  IconButtonProps,
  ParticipantVideoProps,
} from "../types/components/typesVideocall";

export const VideoCallContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--background-dark);
  color: var(--text-light);
  border-radius: 0;
  overflow: hidden;
  flex: 1;
`;

export const VideoCallHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: var(--background-light);
`;

export const VideoCallContent = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  overflow-y: auto;
`;

export const ParticipantVideo = styled.div<ParticipantVideoProps>`
  position: relative;
  background-color: var(--background-light);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 150px;
  cursor: pointer;

  transition: all 0.3s ease;

  ${(props) =>
    props.selected &&
    `
    width: 300px;
    height: 225px;
    z-index: 10;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    border: 2px solid var(--primary-color);
    order: -1;
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ParticipantName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
`;

export const RemoveParticipant = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4444;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
`;

export const CallControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background-color: var(--background-light);
`;

export const IconButton = styled.button<IconButtonProps>`
  background-color: var(--primary-color);
  color: var(--text-dark);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) =>
    props.muted &&
    `
    background-color: #ff4444;
  `}

  ${(props) =>
    props.videoOff &&
    `
    background-color: #888;
  `}
    
  ${(props) =>
    props.endCall &&
    `
    background-color: #ff4444;
  `}
`;

export const AddParticipantsModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background-light);
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

//

export const ModalContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const ExpandedView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-dark);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExpandedParticipant = styled.div`
  width: 90%;
  height: 90%;
  background-color: var(--background-light);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
