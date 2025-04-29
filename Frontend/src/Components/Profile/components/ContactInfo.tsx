import { FaEnvelope, FaMobileAlt } from "react-icons/fa";
import { ProfileSection } from "../../../styled/ProfilePageStyle";

interface ContactInfoProps {
  email: string;
  phone: string;
}

export default function ContactInfo({ email, phone }: ContactInfoProps) {
  return (
    <ProfileSection>
      <div className="field-content">
        <FaEnvelope />
        <span>Email: {email}</span>
      </div>
      <div className="field-content">
        <FaMobileAlt />
        <span>Phone: {phone}</span>
      </div>
    </ProfileSection>
  );
}