import { FaBirthdayCake } from "react-icons/fa";
import { ProfileSection } from "../../../styled/ProfilePageStyle";

interface BirthDateProps {
  birthDate: string;
}

export default function BirthDate({ birthDate }: BirthDateProps) {
  return (
    <ProfileSection>
      <div className="field-content">
        <FaBirthdayCake />
        <span>Birth Date: {birthDate}</span>
      </div>
    </ProfileSection>
  );
}