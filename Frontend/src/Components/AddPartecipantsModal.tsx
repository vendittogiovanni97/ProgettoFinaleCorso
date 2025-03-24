import React from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Contact } from "../types/components/typesChatLists";
import { Group } from "../types/components/typesChatLists";
import { Channel } from "../types/components/typesDiscordSidebar";

interface AddParticipantsModalProps {
  onAddParticipant: (participant: {
    id: string | number;
    name: string;
  }) => void;
  onClose: () => void;
}

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  onAddParticipant,
  onClose,
}) => {
  // Esempio di dati (dovrebbero essere passati come props o recuperati da uno stato globale)
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Anil",
      status: "Online",
      avatar: "",
      lastSeen: "2:02pm",
      isOnline: true,
    },
    {
      id: 2,
      name: "Chutthiya",
      status: "Busy",
      avatar: "",
      lastSeen: "12:15pm",
      isOnline: false,
    },
  ];

  const groups: Group[] = [
    {
      id: 101,
      name: "Friends Forever",
      description: "hahahaha!!!",
      avatar: "",
      lastActive: "9:50pm",
    },
  ];

  const channels: Channel[] = [
    { id: "channel1", name: "Lobby", type: "voice" },
    { id: "channel2", name: "PrimaStanza", type: "voice" },
  ];

  const handleAddParticipant = (participant: {
    id: string | number;
    name: string;
  }) => {
    onAddParticipant(participant);
    onClose();
  };

  return (
    <Box className="add-participants-modal">
      <Box className="modal-header">
        <Typography variant="h6">Aggiungi partecipanti</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box className="modal-content">
        <Typography variant="subtitle1">Contatti</Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem
              key={contact.id}
              component="button"
              onClick={() => handleAddParticipant(contact)}
            >
              <ListItemAvatar>
                <Avatar>{contact.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={contact.status} />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1">Gruppi</Typography>
        <List>
          {groups.map((group) => (
            <ListItem
              key={group.id}
              component="button"
              onClick={() => handleAddParticipant(group)}
            >
              <ListItemAvatar>
                <Avatar>{group.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={group.name}
                secondary={group.description}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1">Canali vocali</Typography>
        <List>
          {channels.map((channel) => (
            <ListItem
              key={channel.id}
              component="button"
              onClick={() => handleAddParticipant(channel)}
            >
              <ListItemAvatar>
                <Avatar>🔊</Avatar>
              </ListItemAvatar>
              <ListItemText primary={channel.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AddParticipantsModal;
