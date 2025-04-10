export interface Workout {
  name: string;
  date: string;
  exercises: Array<Exercise>;
}

export interface Exercise {
  name: string;
  numSets: number;
  sets: Array<Set>;
}

export interface Set {
  reps: number;
  weight: number;
}
