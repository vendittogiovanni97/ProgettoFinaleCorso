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
import { ContactProfilePageProps } from "../types/components/typesProfile";

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

  // Handle loading state
  if (!contact) {
    return <div>Loading profile...</div>;
  }

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