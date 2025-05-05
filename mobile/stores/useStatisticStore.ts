import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface StatisticStore {
  workoutOptions: Array<string>;
  exerciseOptions: Array<string>;
  setWorkoutOptions: (workoutOptions: Array<string>) => void;
  setExerciseOptions: (exerciseOptions: Array<string>) => void;
  reset: () => void;
}

const initialState = {
  workoutOptions: ["No data"],
  exerciseOptions: ["No data"],
};

const useStatisticStore = create(
  persist<StatisticStore>(
    (set) => ({
      ...initialState,
      setWorkoutOptions: (workoutOptions: Array<string>) => {
        set({ workoutOptions: workoutOptions });
      },
      setExerciseOptions: (exerciseOptions: Array<string>) => {
        set({ exerciseOptions: exerciseOptions });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useStatisticStore.persist.clearStorage();
      },
    }),
    {
      name: "statisticStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useStatisticStore;
