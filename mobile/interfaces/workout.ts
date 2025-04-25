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
  reps: number;
  weight: number;
}

export interface SplitDescription {
  name: string;
  description: string;
}

export type modalSteps = "split" | "custom" | "intensity";
