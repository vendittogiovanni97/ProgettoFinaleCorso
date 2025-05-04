import React from "react";
import { ProfileSidebarProps } from "../../types/components/typesProfile";
import { Avatar } from "../ProfilePage/components/avatar/AvatarStyles";
import { H2Style } from "../ProfilePage/ProfilePageStyles";
import ProfileSidebar from '../ProfilePage/components/Sidebar/SidebarStyles'

const ProfileSidebarComponent: React.FC<ProfileSidebarProps> = ({ 
  contact, 
  jobTitle 
}) => {
  return (
    <ProfileSidebar>
      <Avatar>
        <img src={contact.avatar || "/pics.png"} alt={`${contact.name}'s profile`} />
      </Avatar>
      <H2Style>{contact.name}</H2Style>
      <p style={{ color: "rgba(255,215,0,0.7", marginTop: "10px" }}>
        {jobTitle}
      </p>
    </ProfileSidebar>
  );
};

export default ProfileSidebarComponent;