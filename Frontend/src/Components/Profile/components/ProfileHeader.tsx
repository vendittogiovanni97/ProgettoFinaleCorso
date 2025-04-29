import { Avatar, ProfileSidebar, H2Style } from "../../../styled/ProfilePageStyle";
import { Contact } from "../../../types/components/typesDashboard";

interface ProfileHeaderProps {
  contact: Contact;
  jobTitle: string;
}

export default function ProfileHeader({ contact, jobTitle }: ProfileHeaderProps) {
  return (
    <ProfileSidebar>
      <Avatar>
        <img
          src={contact.avatar || "/pics.png"}
          alt={`${contact.name}'s profile`}
        />
      </Avatar>
      <H2Style>{contact.name}</H2Style>
      <p style={{ color: "rgba(255,215,0,0.7", marginTop: "10px" }}>
        {jobTitle}
      </p>
    </ProfileSidebar>
  );
}