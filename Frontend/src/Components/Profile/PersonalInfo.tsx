import { FaUser } from "react-icons/fa";
import { ProfileSection } from "../../styled/ProfilePageStyle";

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
}

export default function PersonalInfo({ firstName, lastName }: PersonalInfoProps) {
  return (
    <ProfileSection>
      <div className="field-content">
        <FaUser />
        <span>First Name: {firstName}</span>
      </div>
      <div className="field-content">
        <FaUser />
        <span>Last Name: {lastName}</span>
      </div>
    </ProfileSection>
  );
}