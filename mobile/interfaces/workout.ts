export interface Workout {
  name: string;
  date: Date;
  exercises: Array<Exercise>;
}

export interface Exercise {
  name: string;
  numSets: number;
  sets: Array<Set>;
}

export interface Set {
  rep: number;
  weight: number;
}
