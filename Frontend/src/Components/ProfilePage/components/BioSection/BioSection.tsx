import React from "react";
import { BioSectionContainer, BioTextarea } from "./BioSectionStyles";
import { FaPen } from "react-icons/fa";

interface BioSectionProps {
  bio: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const BioSection: React.FC<BioSectionProps> = ({
  bio,
  isEditing,
  onEdit,
  onChange,
  onBlur
}) => {
  return (
    <BioSectionContainer>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Biografia</h3>
        <FaPen
          style={{ cursor: "pointer", opacity: 0.7 }}
          onClick={onEdit}
        />
      </div>
      {isEditing ? (
        <BioTextarea
          value={bio}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Scrivi qualcosa su di te..."
        />
      ) : (
        <p>{bio}</p>
      )}
    </BioSectionContainer>
  );
};

export default BioSection;