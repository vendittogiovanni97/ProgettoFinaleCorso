import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, ProfileGrid, ProfileContent } from "../styled/ProfilePageStyle";
import { Contact } from "../types/components/typesDashboard";
import { ContactProfilePageProps } from "../types/components/typesProfile";
import ProfileHeader from "../Components/Profile/components/ProfileHeader";
import PersonalInfo from "../Components/Profile/PersonalInfo";
import BirthDate from "../Components/Profile/components/BirthDate";
import ContactInfo from "../Components/Profile/components/ContactInfo";
import WorkInfo from "../Components/Profile/components/WorkInfo";
import Bio from "../Components/Profile/components/Bio";

const Profile: React.FC<ContactProfilePageProps> = ({ contact: initialContact }) => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(initialContact || null);
  const [profileDetails, setProfileDetails] = useState({
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
        <ProfileHeader contact={contact} jobTitle={profileDetails.jobTitle} />
        
        <ProfileContent>
          <PersonalInfo 
            firstName={profileDetails.firstName}
            lastName={profileDetails.lastName}
          />
          <BirthDate birthDate={profileDetails.birthDate} />
          <ContactInfo 
            email={profileDetails.email}
            phone={contact.phone}
          />
          <WorkInfo 
            jobTitle={profileDetails.jobTitle}
            location={profileDetails.location}
          />
          <Bio bio={profileDetails.bio} />
        </ProfileContent>
      </ProfileGrid>
    </Container>
  );
};

export default Profile;