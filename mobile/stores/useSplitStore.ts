import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface SplitStore {
  splitName: string;
  splitIntensity: string;
  splitTrainingDays: Array<string>;
  currentDayIndex: number;
  setSplitName: (name: string) => void;
  setSplitIntensity: (intensity: string) => void;
  setSplitTraingingDays: (trainingDays: Array<string>) => void;
  setCurrentDayIndex: (currentDayIndex: number) => void;
}

const useSplitStore = create(
  persist<SplitStore>(
    (set) => ({
      splitName: "",
      splitIntensity: "",
      splitTrainingDays: [],
      currentDayIndex: 0,
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
    }),
    {
      name: "splitStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useSplitStore;
