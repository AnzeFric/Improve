import EncryptedStorage from "react-native-encrypted-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  firstName: string;
  lastName: string;
  dayStreak: number;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setDayStreak: (dayStreak: number) => void;
  resetUserStore: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      firstName: "",
      lastName: "",
      dayStreak: 0,
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
      setDayStreak: (dayStreak: number) => {
        set({
          dayStreak: dayStreak,
        });
      },
      resetUserStore: () => {
        set({
          firstName: "",
          lastName: "",
          dayStreak: 0,
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
