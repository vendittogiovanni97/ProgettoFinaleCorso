import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaBriefcase,
} from "react-icons/fa";
import {
  Container,
  ProfileGrid,
  ProfileSidebar,
  Avatar,
  ProfileContent,
  ProfileSection,
  H2Style,
} from "../styled/ProfilePageStyle";
import { Contact } from "../types/components/typesDashboard";
import "../styled/ProfilePageStyle";

export interface ContactProfilePageProps {
  contact?: Contact; // Make contact optional as we'll load it from the ID
}

const Profile: React.FC<ContactProfilePageProps> = ({ contact: initialContact }) => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(initialContact || null);
  
  useEffect(() => {
    // If no initial contact is provided, we could fetch the contact based on the ID
    if (!initialContact && id) {
      // In a real app, you would fetch the contact data from your API here
      // For now, we'll simulate with a mock contact
      const fetchedContact: Contact = {
        id: parseInt(id),
        name: `User ${id}`, // This would come from your API
        status: "Active",
        lastSeen: "2:02pm",
        isOnline: true,
        avatar: "/pics.png",
        phone: "+39 392 123 4567"
      };
      setContact(fetchedContact);
    } else if (initialContact) {
      setContact(initialContact);
    }
  }, [id, initialContact]);

  // Handle loading state
  if (!contact) {
    return <div>Loading profile...</div>;
  }

  const [profileDetails, setProfileDetails] = useState({
    firstName: contact.name?.split(" ")[0] || "",
    lastName: contact.name?.split(" ").slice(1).join(" ") || "",
    jobTitle: "Not Specified",
    birthDate: "Not Specified",
    email: `${contact.name?.toLowerCase().replace(" ", ".")}@example.com`,
    location: "Not specified",
    bio: contact.status || "No additional bio available.",
  });

  return (
    <Container>
      <ProfileGrid>
        <ProfileSidebar>
          <Avatar>
            <img
              src={contact.avatar || "/pics.png"}
              alt={`${contact.name}'s profile`}
            />
          </Avatar>
          <H2Style>{contact.name}</H2Style>
          <p style={{ color: "rgba(255,215,0,0.7", marginTop: "10px" }}>
            {profileDetails.jobTitle}
          </p>
        </ProfileSidebar>

        <ProfileContent>
          <ProfileSection>
            <div className="field-content">
              <FaUser />
              <span>First Name: {profileDetails.firstName}</span>
            </div>
            <div className="field-content">
              <FaUser />
              <span>Last Name: {profileDetails.lastName}</span>
            </div>
          </ProfileSection>

          <ProfileSection>
            <div className="field-content">
              <FaBirthdayCake />
              <span>Birth Date: {profileDetails.birthDate}</span>
            </div>
          </ProfileSection>

          <ProfileSection>
            <div className="field-content">
              <FaEnvelope />
              <span>Email: {profileDetails.email}</span>
            </div>
            <div className="field-content">
              <FaMobileAlt />
              <span>Phone: {contact.phone}</span>
            </div>
          </ProfileSection>

          <ProfileSection>
            <div className="field-content">
              <FaBriefcase />
              <span>Job Title: {profileDetails.jobTitle}</span>
            </div>
            <div className="field-content">
              <FaMapMarkerAlt />
              <span>Location: {profileDetails.location}</span>
            </div>
          </ProfileSection>

          <ProfileSection>
            <div className="field-content">
              <p>
                <strong>Bio:</strong> {profileDetails.bio}
              </p>
            </div>
          </ProfileSection>
        </ProfileContent>
      </ProfileGrid>
    </Container>
  );
};

export default Profile;