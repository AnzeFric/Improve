import EncryptedStorage from "react-native-encrypted-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  firstName: string;
  lastName: string;
  startStreak: Date;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setStartStreak: (startStreak: Date) => void;
  resetUserStore: () => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      firstName: "",
      lastName: "",
      startStreak: new Date(),
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
      resetUserStore: () => {
        set({
          firstName: "",
          lastName: "",
          startStreak: new Date(),
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
