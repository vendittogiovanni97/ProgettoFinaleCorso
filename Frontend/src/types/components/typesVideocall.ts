export interface Participant {
    id: string | number;
    name: string;
  }
  
export interface ParticipantVideoProps {
    expanded?: boolean;
}
  
export interface IconButtonProps {
    muted?: boolean;
    disabled?: boolean;
    endCall?: boolean;
}