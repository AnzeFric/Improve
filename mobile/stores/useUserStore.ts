import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  firstName: string;
  lastName: string;
  firstLogin: boolean;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setFirstLogin: (firstLogin: boolean) => void;
  reset: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  firstLogin: true,
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
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
      setFirstLogin: (firstLogin: boolean) => {
        set({
          firstLogin: firstLogin,
        });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useUserStore;
