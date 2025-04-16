export interface User {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

export interface UserMetrics {
  age: number | null;
  weight: number;
  height: number;
}
