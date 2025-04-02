export interface Participant {
  id: string | number;
  name: string;
}

export interface ParticipantVideoProps {
  selected?: boolean;
}

export interface IconButtonProps {
  muted?: boolean;
  videoOff?: boolean;
  disabled?: boolean;
  endCall?: boolean;
}

//
