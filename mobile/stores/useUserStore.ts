import EncryptedStorage from "react-native-encrypted-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  firstName: string;
  lastName: string;
  startStreak: Date;
  lastCheckIn: Date;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setStartStreak: (startStreak: Date) => void;
  setLastCheckIn: (lastCheckIn: Date) => void;
  resetUserStore: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      firstName: "",
      lastName: "",
      startStreak: new Date(),
      lastCheckIn: new Date(),
      setFirstName: (firstName: string) => {
        set({
          firstName: firstName,
        });
      },
      setLastName: (lastName: string) => {
        set({
          lastName: lastName,
        });
      },
      setStartStreak: (startStreak: Date) => {
        set({
          startStreak: startStreak,
        });
      },
      setLastCheckIn: (lastCheckIn: Date) => {
        set({
          lastCheckIn: lastCheckIn,
        });
      },
      resetUserStore: () => {
        set({
          firstName: "",
          lastName: "",
          startStreak: new Date(),
          lastCheckIn: new Date(),
        });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useUserStore;
