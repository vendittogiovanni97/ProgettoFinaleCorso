import React, { useState } from "react";
import { ProfileContentContainer, ProfileSection } from "./ProfileContentStyle";
import EditableField from "../EditableField/EditableField";
import BioSection from "../BioSection/BioSection";
import useThemeColors from "../../../../styled/BarraSuperioreStyled";
import {
  FaUser,
} from "react-icons/fa";

const ProfileContent: React.FC = () => {
  const themeColors = useThemeColors();
  const [profile, setProfile] = useState({
    firstName: "Alec",
    lastName: "Thompson",
    jobTitle: "Professional Developer",
    birthDate: "1995-06-15",
    email: "alecthompson@mail.com",
    phone: "(44) 123 1234 123",
    location: "New York, USA",
    bio: "Strategic thinker and innovative problem solver..."
  });

  const [editingFields, setEditingFields] = useState({
    firstName: false,
    lastName: false,
    jobTitle: false,
    birthDate: false,
    email: false,
    phone: false,
    location: false,
    bio: false
  });

  const handleEdit = (field: keyof typeof editingFields) => {
    setEditingFields(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof typeof editingFields) => {
    setEditingFields(prev => ({ ...prev, [field]: false }));
  };

  return (
    <ProfileContentContainer style={{
      backgroundColor: themeColors?.backgroundLight,
      color: themeColors?.textLight
    }}>
      <ProfileSection>
        <EditableField
          value={profile.firstName}
          icon={<FaUser />}
          isEditing={editingFields.firstName}
          onEdit={() => handleEdit("firstName")}
          onChange={(value) => handleChange("firstName", value)}
          onBlur={() => handleBlur("firstName")}
        />
        <EditableField
          value={profile.lastName}
          icon={<FaUser />}
          isEditing={editingFields.lastName}
          onEdit={() => handleEdit("lastName")}
          onChange={(value) => handleChange("lastName", value)}
          onBlur={() => handleBlur("lastName")}
        />
      </ProfileSection>

      {/* Altri ProfileSection con EditableField simili */}
      
      <BioSection
        bio={profile.bio}
        isEditing={editingFields.bio}
        onEdit={() => handleEdit("bio")}
        onChange={(value) => handleChange("bio", value)}
        onBlur={() => handleBlur("bio")}
      />
    </ProfileContentContainer>
  );
};

export default ProfileContent;