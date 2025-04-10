export interface User {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  weight?: number;
  age?: number;
}

export interface UserMetrics {
  age: number | null;
  weight: number;
  height: number;
}
