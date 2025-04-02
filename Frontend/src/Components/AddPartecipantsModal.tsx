import React from "react";
import { Box, List, ListItemAvatar, ListItemText } from "@mui/material";
import { Contact } from "../types/components/typesChatLists";
import { Group } from "../types/components/typesChatLists";
import { Channel } from "../types/components/typesDiscordSidebar";
import { AddParticipantsModalProps } from "../types/components/typesAddParticipantsModal";
import {
  StyleTypography,
  StyleListItem,
  StyleAvatar,
  StyleListItemText,
} from "../styled/AddParticipantsModalStyled";
import { MdOutlineVolumeUp } from "react-icons/md";

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  onAddParticipant,
  onClose,
}) => {
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
      <StyleTypography>Contatti</StyleTypography>
      <List>
        {contacts.map((contact) => (
          <StyleListItem
            key={contact.id}
            component="button"
            onClick={() => handleAddParticipant(contact)}
          >
            <ListItemAvatar>
              <StyleAvatar>{contact.name.charAt(0)}</StyleAvatar>
            </ListItemAvatar>
            <ListItemText primary={contact.name} secondary={contact.status} />
          </StyleListItem>
        ))}
      </List>

      <StyleTypography>Gruppi</StyleTypography>
      <List>
        {groups.map((group) => (
          <StyleListItem
            key={group.id}
            component="button"
            onClick={() => handleAddParticipant(group)}
          >
            <ListItemAvatar>
              <StyleAvatar>{group.name.charAt(0)}</StyleAvatar>
            </ListItemAvatar>
            <ListItemText primary={group.name} secondary={group.description} />
          </StyleListItem>
        ))}
      </List>

      <StyleTypography>Canali vocali</StyleTypography>
      <List>
        {channels.map((channel) => (
          <StyleListItem
            key={channel.id}
            component="button"
            onClick={() => handleAddParticipant(channel)}
          >
            <ListItemAvatar>
              <StyleAvatar>
                <MdOutlineVolumeUp />
              </StyleAvatar>
            </ListItemAvatar>
            <ListItemText primary={channel.name} />
          </StyleListItem>
        ))}
      </List>
    </Box>
  );
};

export default AddParticipantsModal;
