import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface SplitStore {
  splitName: string;
  splitIntensity: string;
  splitTrainingDays: Array<string>;
  currentDayIndex: number;
  lastTrainingDayChange: Date;
  setSplitName: (name: string) => void;
  setSplitIntensity: (intensity: string) => void;
  setSplitTraingingDays: (trainingDays: Array<string>) => void;
  setCurrentDayIndex: (currentDayIndex: number) => void;
  setLastTrainingDayChange: (lastTrainingDayChange: Date) => void;
  reset: () => void;
}

const initialState = {
  splitName: "",
  splitIntensity: "",
  splitTrainingDays: [],
  currentDayIndex: 0,
  lastTrainingDayChange: new Date(),
};

const useSplitStore = create(
  persist<SplitStore>(
    (set) => ({
      ...initialState,
      setSplitName: (splitName: string) => {
        set({ splitName: splitName });
      },
      setSplitIntensity: (splitIntensity: string) => {
        set({ splitIntensity: splitIntensity });
      },
      setSplitTraingingDays: (splitTrainingDays: Array<string>) => {
        set({ splitTrainingDays: splitTrainingDays });
      },
      setCurrentDayIndex: (currentDayIndex: number) => {
        set({ currentDayIndex: currentDayIndex });
      },
      setLastTrainingDayChange: (lastTrainingDayChange: Date) => {
        set({ lastTrainingDayChange: lastTrainingDayChange });
      },
      reset: () => {
        set(() => ({ ...initialState }));
        useSplitStore.persist.clearStorage();
      },
    }),
    {
      name: "splitStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useSplitStore;
