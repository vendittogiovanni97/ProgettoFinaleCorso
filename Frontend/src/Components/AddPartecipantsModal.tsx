import React, { useEffect, useState } from "react";
import { Box, List, ListItemAvatar, ListItemText } from "@mui/material";
import { Contact, Group } from "../types/components/typesChatLists";
import { Channel } from "../types/components/typesDiscordSidebar";
import { AddParticipantsModalProps } from "../types/components/typesAddParticipantsModal";
import {
  StyleTypography,
  StyleListItem,
  StyleAvatar,
} from "../styled/AddParticipantsModalStyled";
import { MdOutlineVolumeUp } from "react-icons/md";
import userService from "../services/components/userService";

const AddParticipantsModal: React.FC<AddParticipantsModalProps> = ({
  onAddParticipant,
  onClose,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recupera i contatti (amici)
        const friendsList = await userService.getFriends();
        const formattedContacts = friendsList.map((friend) => ({
          id: friend.id,
          name: friend.username,
          status: friend.status || "Online",
          avatar: friend.avatar || "",
          lastSeen:
            friend.lastSeen instanceof Date
              ? friend.lastSeen.toISOString()
              : friend.lastSeen || "",
          isOnline: friend.isOnline || true,
        }));
        setContacts(formattedContacts);

        // Per ora manteniamo i gruppi statici come esempio
        setGroups([
          {
            id: 101,
            name: "Friends Forever",
            description: "hahahaha!!!",
            avatar: "",
            lastActive: "9:50pm",
          },
        ]);

        // Per ora manteniamo i canali statici come esempio
        setChannels([
          { id: "channel1", name: "Lobby", type: "voice" },
          { id: "channel2", name: "PrimaStanza", type: "voice" },
        ]);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };

    fetchData();
  }, []);

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
            as="button"
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
            as="button"
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
            as="button"
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
