import { ProfileSection } from "../../../styled/ProfilePageStyle";

interface BioProps {
  bio: string;
}

export default function Bio({ bio }: BioProps) {
  return (
    <ProfileSection>
      <div className="field-content">
        <p>
          <strong>Bio:</strong> {bio}
        </p>
      </div>
    </ProfileSection>
  );
}