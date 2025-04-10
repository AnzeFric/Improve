import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface AuthStore {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;

  expiresIn: number;
  setExpiresIn: (expiresIn: number) => void;

  isLoggined: boolean;
  setIsLoggined: (isLoggined: boolean) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      jwt: null,
      expiresIn: 0,
      isLoggined: false,
      setJwt: async (jwt: string | null) => {
        set({ jwt: jwt });
      },
      setExpiresIn: async (expiresIn: number) => {
        set({ expiresIn: expiresIn });
      },
      setIsLoggined: async (isLoggined: boolean) => {
        set({ isLoggined: isLoggined });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useAuthStore;
