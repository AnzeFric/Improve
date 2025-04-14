import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface SplitStore {
  splitName: string;
  splitIntensity: string;
  splitTrainingDays: Array<string>;
  setSplitName: (name: string) => void;
  setSplitIntensity: (intensity: string) => void;
  setSplitTraingingDays: (trainingDays: Array<string>) => void;
  resetSplitStore: () => void;
}

const useSplitStore = create(
  persist<SplitStore>(
    (set) => ({
      splitName: "",
      splitIntensity: "",
      splitTrainingDays: [],
      setSplitName: (splitName: string) => {
        set({ splitName: splitName });
      },
      setSplitIntensity: (splitIntensity: string) => {
        set({ splitIntensity: splitIntensity });
      },
      setSplitTraingingDays: (splitTrainingDays: Array<string>) => {
        set({ splitTrainingDays: splitTrainingDays });
      },
      resetSplitStore: () => {
        set({
          splitName: "",
          splitIntensity: "",
          splitTrainingDays: [],
        });
      },
    }),
    {
      name: "splitStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useSplitStore;
