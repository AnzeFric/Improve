import { create } from "zustand";
import { Workout } from "@/interfaces/workout";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface WorkoutStore {
  lastestWorkout: Workout | null;
  setLatestWorkout: (lastestWorkout: Workout | null) => void;
  reset: () => void;
}

const initialState = {
  lastestWorkout: null,
};

const useWorkoutStore = create(
  persist<WorkoutStore>(
    (set) => ({
      ...initialState,
      setLatestWorkout: (lastestWorkout: Workout | null) => {
        set({ lastestWorkout: lastestWorkout });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useWorkoutStore.persist.clearStorage();
      },
    }),
    {
      name: "workoutStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useWorkoutStore;
