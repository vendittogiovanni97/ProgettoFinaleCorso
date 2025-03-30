import React, { useState } from "react";
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
} from "../styled/ProfilePageStyle";
import { ContactProfilePageProps } from "../types/components/typesProfile";

const Profile: React.FC<ContactProfilePageProps> = ({ contact }) => {
  const [profileDetails, setProfileDetails] = useState({
    firstName: contact.name.split(" ")[0],
    lastName: contact.name.split(" ").slice(1).join(" ") || "",
    jobTitle: "Not Specified",
    birthDate: "Not Specified",
    email: `${contact.name.toLowerCase().replace(" ", ".")}@example.com`,
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
          <h2>{contact.name}</h2>
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
