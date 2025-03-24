export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  weight?: number;
  age?: number;
}

export interface Profile {
  userId: string;
  age?: number;
  weight: number;
  height: number;
}
