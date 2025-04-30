import React from "react";
import { ProfileContent, ProfileSection } from "../../styled/ProfilePageStyle";
import { ProfileContentProps } from "../../types/components/typesProfile";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaBriefcase,
} from "react-icons/fa";

const ProfileContentComponent: React.FC<ProfileContentProps> = ({
  profileDetails,
  phone,
}) => {
  return (
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
          <span>Phone: {phone}</span>
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
  );
};

export default ProfileContentComponent;