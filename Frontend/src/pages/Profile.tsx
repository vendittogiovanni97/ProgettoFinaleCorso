import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileSidebarComponent from "../Components/Profile/ProfileSidebar";
import ProfileContentComponent from "../Components/Profile/ProfileContent";
import { 
  ContactProfilePageProps,
  ProfileDetails
} from "../types/components/typesProfile";
import { Container, ProfileGrid } from "../Components/ProfilePage/ProfilePageStyles";
import { Contact } from "../types/components/typesChatLists";

const Profile: React.FC<ContactProfilePageProps> = ({ contact: initialContact }) => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(initialContact || null);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    firstName: "",
    lastName: "",
    jobTitle: "Not Specified",
    birthDate: "Not Specified",
    email: "",
    location: "Not specified",
    bio: "No additional bio available.",
  });

  useEffect(() => {
    if (!initialContact && id) {
      const fetchedContact: Contact = {
        id: parseInt(id),
        name: `User ${id}`,
        status: "Active",
        lastSeen: "2:02pm",
        isOnline: true,
        avatar: "/pics.png",
        phone: "+39 392 123 4567"
      };
      setContact(fetchedContact);
      setProfileDetails({
        firstName: fetchedContact.name?.split(" ")[0] || "",
        lastName: fetchedContact.name?.split(" ").slice(1).join(" ") || "",
        jobTitle: "Not Specified",
        birthDate: "Not Specified",
        email: `${fetchedContact.name?.toLowerCase().replace(" ", ".")}@example.com`,
        location: "Not specified",
        bio: fetchedContact.status || "No additional bio available.",
      });
    } else if (initialContact) {
      setContact(initialContact);
      setProfileDetails({
        firstName: initialContact.name?.split(" ")[0] || "",
        lastName: initialContact.name?.split(" ").slice(1).join(" ") || "",
        jobTitle: "Not Specified",
        birthDate: "Not Specified",
        email: `${initialContact.name?.toLowerCase().replace(" ", ".")}@example.com`,
        location: "Not specified",
        bio: initialContact.status || "No additional bio available.",
      });
    }
  }, [id, initialContact]);

  if (!contact) {
    return <div>Loading profile...</div>;
  }

  return (
    <Container>
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