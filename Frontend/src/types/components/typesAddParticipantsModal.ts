export interface AddParticipantsModalProps {
  onAddParticipant: (participant: {
    id: string | number;
    name: string;
  }) => void;
  onClose: () => void;
}
