

export interface User {
    id: number;
    username: string;
    name?: string;
  }
  
export interface FriendRequest {
    id: number;
    user: User;
    status: string;
  }



  