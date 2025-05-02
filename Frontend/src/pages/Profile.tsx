import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, ProfileGrid } from "../styled/ProfilePageStyle";
import ProfileSidebarComponent from "../Components/Profile/ProfileSidebar";
import ProfileContentComponent from "../Components/Profile/ProfileContent";
import { 
  ContactProfilePageProps,
  ProfileDetails
} from "../types/components/typesProfile";
import { ThemeContext } from "../context/ThemeContextDefinition";

const Profile: React.FC<ContactProfilePageProps> = ({ contact: initialContact }) => {
  const { id } = useParams<{ id: string }>();
  const { mode } = useContext(ThemeContext); // Get current theme mode
  
  // For development: fallback to test user if no contact is provided
  const testContact = {
    id: 1,
    name: "Mario Rossi",
    status: "Attivo",
    lastSeen: "14:02",
    isOnline: true,
    avatar: "/pics.png",
    phone: "+39 392 123 4567"
  };
  const [contact, setContact] = useState<Contact | null>(initialContact || testContact);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    firstName: "",
    lastName: "",
    jobTitle: "Non specificato",
    birthDate: "Non specificato",
    email: "",
    location: "Non specificato",
    bio: "Nessuna bio aggiuntiva disponibile.",
  });

  useEffect(() => {
    if (!initialContact && id) {
      const fetchedContact: Contact = {
        id: parseInt(id),
        name: `Utente ${id}`,
        status: "Attivo",
        lastSeen: "14:02",
        isOnline: true,
        avatar: "/pics.png",
        phone: "+39 392 123 4567"
      };
      setContact(fetchedContact);
      setProfileDetails({
        firstName: fetchedContact.name?.split(" ")[0] || "",
        lastName: fetchedContact.name?.split(" ").slice(1).join(" ") || "",
        jobTitle: "Non specificato",
        birthDate: "Non specificato",
        email: `${fetchedContact.name?.toLowerCase().replace(" ", ".")}@esempio.com`,
        location: "Non specificato",
        bio: fetchedContact.status || "Nessuna bio aggiuntiva disponibile.",
      });
    } else if (initialContact) {
      setContact(initialContact);
      setProfileDetails({
        firstName: initialContact.name?.split(" ")[0] || "",
        lastName: initialContact.name?.split(" ").slice(1).join(" ") || "",
        jobTitle: "Non specificato",
        birthDate: "Non specificato",
        email: `${initialContact.name?.toLowerCase().replace(" ", ".")}@esempio.com`,
        location: "Non specificato",
        bio: initialContact.status || "Nessuna bio aggiuntiva disponibile.",
      });
    }
  }, [id, initialContact]);

  if (!contact) {
    return <div>Loading profile...</div>;
  }

  return (
    <Container themeMode={mode}>
      <ProfileGrid>
        <ProfileSidebarComponent 
          contact={contact} 
          jobTitle={profileDetails.jobTitle} 
        />
        <ProfileContentComponent 
          profileDetails={profileDetails} 
          phone={contact.phone} 
        />
      </ProfileGrid>
    </Container>
  );
};

export default Profile;