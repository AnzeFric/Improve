import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface StreakStore {
  startStreak: Date;
  lastCheckIn: Date;
  setStartStreak: (startStreak: Date) => void;
  setLastCheckIn: (lastCheckIn: Date) => void;
}

const useStreakStore = create(
  persist<StreakStore>(
    (set) => ({
      startStreak: new Date(),
      lastCheckIn: new Date(),
      setStartStreak: (startStreak: Date) => {
        set({ startStreak: startStreak });
      },
      setLastCheckIn: (lastCheckIn: Date) => {
        set({ lastCheckIn: lastCheckIn });
      },
    }),
    {
      name: "streakStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useStreakStore;
