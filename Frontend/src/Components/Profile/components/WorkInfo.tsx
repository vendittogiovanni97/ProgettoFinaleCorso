import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { ProfileSection } from "../../../styled/ProfilePageStyle";

interface WorkInfoProps {
  jobTitle: string;
  location: string;
}

export default function WorkInfo({ jobTitle, location }: WorkInfoProps) {
  return (
    <ProfileSection>
      <div className="field-content">
        <FaBriefcase />
        <span>Job Title: {jobTitle}</span>
      </div>
      <div className="field-content">
        <FaMapMarkerAlt />
        <span>Location: {location}</span>
      </div>
    </ProfileSection>
  );
}