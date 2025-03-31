import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Close, Mic, MicOff, Videocam, VideocamOff, PersonAdd, CallEnd } from '@mui/icons-material';
import AddParticipantsModal from '../AddPartecipantsModal';
import { Participant } from '../../types/components/typesVideocall';
import {
  VideoCallContainer,
  VideoCallHeader,
  VideoCallContent,
  ParticipantVideo,
  ParticipantName,
  RemoveParticipant,
  CallControls,
  IconButton,
  AddParticipantsModal as StyledModal,
  ModalHeader,
  ModalContent,
  ExpandedView,
  ExpandedParticipant
} from '../../styled/VideoCallStyled'; // Assume this is where you save the styled components

const VideoCall: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'me', name: 'Tu' },
  ]);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [expandedParticipant, setExpandedParticipant] = useState<string | number | null>(null);

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const addParticipant = (participant: Participant) => {
    setParticipants((prev) => [...prev, participant]);
  };

  const removeParticipant = (id: string | number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddParticipantsClick = () => {
    setShowAddParticipants(!showAddParticipants);
  };

  const handleParticipantClick = (id: string | number) => {
    setExpandedParticipant(id);
  };

  const handleCloseExpandedView = () => {
    setExpandedParticipant(null);
  };

  return (
    <VideoCallContainer>
      <VideoCallHeader>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </VideoCallHeader>
      
      <VideoCallContent>
        {participants.map((participant) => (
          <ParticipantVideo
            key={participant.id}
            expanded={expandedParticipant === participant.id}
            onClick={() => handleParticipantClick(participant.id)}
          >
            <img src="/media/user1.jpg" alt="Participant" />
            <ParticipantName>{participant.name}</ParticipantName>
            {participant.id !== 'me' && (
              <RemoveParticipant
                onClick={(e) => {
                  e.stopPropagation();
                  removeParticipant(participant.id);
                }}
              >
                <Close />
              </RemoveParticipant>
            )}
          </ParticipantVideo>
        ))}
      </VideoCallContent>
      
      <CallControls>
        <IconButton 
          muted={isMicMuted}
          onClick={toggleMic}
        >
          {isMicMuted ? <MicOff /> : <Mic />}
        </IconButton>
        <IconButton
          disabled={!isVideoOn}
          onClick={toggleVideo}
        >
          {isVideoOn ? <Videocam /> : <VideocamOff />}
        </IconButton>
        <IconButton onClick={handleAddParticipantsClick}>
          <PersonAdd />
        </IconButton>
        <IconButton endCall onClick={onClose}>
          <CallEnd />
        </IconButton>
      </CallControls>

      {showAddParticipants && (
        <StyledModal>
          <ModalHeader>
            <Typography variant="h6">Aggiungi partecipanti</Typography>
            <IconButton onClick={() => setShowAddParticipants(false)}>
              <Close />
            </IconButton>
          </ModalHeader>
          <ModalContent>
            <AddParticipantsModal
              onAddParticipant={addParticipant}
              onClose={() => setShowAddParticipants(false)}
            />
          </ModalContent>
        </StyledModal>
      )}

      {expandedParticipant && (
        <ExpandedView>
          <ExpandedParticipant>
            <IconButton
              onClick={handleCloseExpandedView}
            >
              <Close />
            </IconButton>
            <img src="/media/user1.jpg" alt="Participant" />
            <ParticipantName>
              {participants.find((p) => p.id === expandedParticipant)?.name}
            </ParticipantName>
          </ExpandedParticipant>
        </ExpandedView>
      )}
    </VideoCallContainer>
  );
};

export default VideoCall;