import React, { useState } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { Close, Mic, MicOff, Videocam, VideocamOff, PersonAdd, CallEnd } from '@mui/icons-material';
import './VideoCall.css';
import AddParticipantsModal from './AddPartecipantsModal'; // Assicurati che il percorso sia corretto
import { Participant } from '../types/typesVideocall'; // Assicurati che il tipo sia definito

const VideoCall: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isMicMuted, setIsMicMuted] = useState(false); // Stato per il microfono
  const [isVideoOn, setIsVideoOn] = useState(true); // Stato per la videocamera
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'me', name: 'Tu' }, // Aggiungi te stesso come partecipante predefinito
  ]); // Stato per i partecipanti
  const [showAddParticipants, setShowAddParticipants] = useState(false); // Stato per mostrare/nascondere la modalità di aggiunta
  const [expandedParticipant, setExpandedParticipant] = useState<string | number | null>(null); // Stato per il partecipante ingrandito

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
    <Box className="video-call-container">
      <Box className="video-call-header">
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box className="video-call-content">
        {participants.map((participant) => (
          <Box
            key={participant.id}
            className={`participant-video ${expandedParticipant === participant.id ? 'expanded' : ''}`}
            onClick={() => handleParticipantClick(participant.id)}
          >
            <img src="/media/user1.jpg" alt="Participant" />
            <Typography className="participant-name">{participant.name}</Typography>
            {participant.id !== 'me' && (
              <IconButton
                className="remove-participant"
                onClick={(e) => {
                  e.stopPropagation(); // Evita che il clic si propaghi al riquadro
                  removeParticipant(participant.id);
                }}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
      <Box className="call-controls">
        <IconButton
          className={`icon-button ${isMicMuted ? 'muted' : ''}`}
          onClick={toggleMic}
        >
          {isMicMuted ? <MicOff /> : <Mic />}
        </IconButton>
        <IconButton
          className={`icon-button ${!isVideoOn ? 'disabled' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoOn ? <Videocam /> : <VideocamOff />}
        </IconButton>
        <IconButton className="icon-button" onClick={handleAddParticipantsClick}>
          <PersonAdd />
        </IconButton>
        <IconButton className="icon-button end-call" onClick={onClose}>
          <CallEnd />
        </IconButton>
      </Box>

      {/* Modalità di aggiunta partecipanti */}
      <Modal open={showAddParticipants} onClose={() => setShowAddParticipants(false)}>
        <Box className="add-participants-modal">
          <Box className="modal-header">
            <Typography variant="h6">Aggiungi partecipanti</Typography>
            <IconButton onClick={() => setShowAddParticipants(false)}>
              <Close />
            </IconButton>
          </Box>
          <Box className="modal-content">
            <AddParticipantsModal
              onAddParticipant={addParticipant}
              onClose={() => setShowAddParticipants(false)}
            />
          </Box>
        </Box>
      </Modal>

      {/* Vista ingrandita del partecipante */}
      {expandedParticipant && (
        <Box className="expanded-view">
          <Box className="expanded-participant">
            <IconButton
              className="close-expanded-view"
              onClick={handleCloseExpandedView}
            >
              <Close />
            </IconButton>
            <img src="/media/user1.jpg" alt="Participant" />
            <Typography className="participant-name">
              {participants.find((p) => p.id === expandedParticipant)?.name}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VideoCall;