import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface StreakStore {
  startStreak: Date;
  lastCheckIn: Date;
  setStartStreak: (startStreak: Date) => void;
  setLastCheckIn: (lastCheckIn: Date) => void;
  reset: () => void;
}

const initialState = {
  startStreak: new Date(),
  lastCheckIn: new Date(),
};

const useStreakStore = create(
  persist<StreakStore>(
    (set) => ({
      ...initialState,
      setStartStreak: (startStreak: Date) => {
        set({ startStreak: startStreak });
      },
      setLastCheckIn: (lastCheckIn: Date) => {
        set({ lastCheckIn: lastCheckIn });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useStreakStore.persist.clearStorage();
      },
    }),
    {
      name: "streakStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useStreakStore;
