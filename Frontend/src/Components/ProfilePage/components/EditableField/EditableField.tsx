import React from "react";
import EditableFieldContainer from "./EditableFieldStyles";
import { FaEdit } from "react-icons/fa";

interface EditableFieldProps {
  value: string;
  icon: React.ReactNode;
  isEditing: boolean;
  type?: string;
  onEdit: () => void;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  icon,
  isEditing,
  type = "text",
  onEdit,
  onChange,
  onBlur
}) => {
  return (
    <EditableFieldContainer>
      <div className="field-content">
        {icon}
        {isEditing ? (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            autoFocus
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      {!isEditing && (
        <FaEdit className="edit-icon" onClick={onEdit} />
      )}
    </EditableFieldContainer>
  );
};

export default EditableField;