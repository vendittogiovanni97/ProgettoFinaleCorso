import React, { useState } from "react";
import { useEffect } from "react";
import {
  FaEdit,
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
  SocialLinks,
  ProfileContent,
  ProfileSection,
  EditableField,
  BioSection,
  BioTextarea,
  H2Style,
} from "../styled/ProfilePageStyle";
import useThemeColors from "../styled/BarraSuperioreStyled";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "Alec",
    lastName: "Thompson",
    jobTitle: "Professional Developer",
    age: "28",
    birthDate: "1995-06-15",
    email: "alecthompson@mail.com",
    phone: "(44) 123 1234 123",
    location: "New York, USA",
    bio: "Strategic thinker and innovative problem solver with a passion for turning complex challenges into elegant solutions. Experienced in developing scalable technologies and leading high-performance teams. Believer in continuous learning and pushing boundaries of what's possible.",
  });
  const themeColors = useThemeColors(); 
  const [age, setAge] = useState(0);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    setAge(calculateAge(profile.birthDate));
  }, [profile.birthDate]);

  const [editingFields, setEditingFields] = useState({
    firstName: false,
    lastName: false,
    jobTitle: false,
    age: false,
    birthDate: false,
    email: false,
    phone: false,
    location: false,
    bio: false,
  });

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleEdit = (field: keyof typeof editingFields) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderEditableField = (
    field: keyof typeof profile,
    label: string,
    icon: React.ReactNode,
    type: string = "text"
  ) => {
    return (
      <EditableField>
        <div className="field-content">
          {icon}
          {editingFields[field] ? (
            <input
              type={type}
              value={profile[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              onBlur={() => toggleEdit(field)}
              autoFocus
            />
          ) : (
            <span>{profile[field]}</span>
          )}
        </div>
        {!editingFields[field] && (
          <FaEdit className="edit-icon" onClick={() => toggleEdit(field)} />
        )}
      </EditableField>
    );
  };

  return (
    <Container>
      <ProfileGrid>
        <ProfileSidebar>
          <Avatar>
            <img src="/pics/default-avatar.png" alt="Profile" />
          </Avatar>
          <H2Style style={{color: themeColors.textLight}}>
            {profile.firstName} {profile.lastName}
          </H2Style>
          <p style={{ color: themeColors.primary, marginTop: "10px" }}>
            {profile.jobTitle}
          </p>

          <SocialLinks></SocialLinks>
        </ProfileSidebar>

        <ProfileContent style={{backgroundColor: themeColors.backgroundLight, color: themeColors.textLight}}>
          <ProfileSection>
            {renderEditableField("firstName", "First Name", <FaUser />, "text")}
            {renderEditableField("lastName", "Last Name", <FaUser />, "text")}
          </ProfileSection>

          <ProfileSection>
            <EditableField>
              <div className="field-content">
                <FaBirthdayCake />
                {editingFields.birthDate ? (
                  <input
                    type="date"
                    value={profile.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    onBlur={() => toggleEdit("birthDate")}
                    autoFocus
                  />
                ) : (
                  <span>
                    {profile.birthDate} (Age: {age})
                  </span>
                )}
              </div>
              {!editingFields.birthDate && (
                <FaEdit
                  className="edit-icon"
                  onClick={() => toggleEdit("birthDate")}
                />
              )}
            </EditableField>
          </ProfileSection>

          <ProfileSection>
            {renderEditableField("email", "Email", <FaEnvelope />, "email")}
            {renderEditableField("phone", "Phone", <FaMobileAlt />)}
          </ProfileSection>

          <ProfileSection>
            {renderEditableField(
              "jobTitle",
              "Job Title",
              <FaBriefcase />,
              "text"
            )}
            {renderEditableField("location", "Location", <FaMapMarkerAlt />)}
          </ProfileSection>

          <BioSection>
            <EditableField>
              <div className="field-content">
                {editingFields.bio ? (
                  <BioTextarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    onBlur={() => toggleEdit("bio")}
                    autoFocus
                  />
                ) : (
                  <p>{profile.bio}</p>
                )}
              </div>
              {!editingFields.bio && (
                <FaEdit
                  className="edit-icon"
                  onClick={() => toggleEdit("bio")}
                />
              )}
            </EditableField>
          </BioSection>
        </ProfileContent>
      </ProfileGrid>
    </Container>
  );
};

export default ProfilePage;
