export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  weight?: number;
  age?: number;
}

export interface UserMetrics {
  age?: number;
  weight: number;
  height: number;
}
