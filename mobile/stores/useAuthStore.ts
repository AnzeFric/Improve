import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface AuthStore {
  jwt: string | null;
  expiresIn: number;
  isLoggined: boolean;
  isFirstLogin: boolean;
  setJwt: (jwt: string | null) => void;
  setExpiresIn: (expiresIn: number) => void;
  setIsLoggined: (isLoggined: boolean) => void;
  setIsFirstLogin: (isFirstLogin: boolean) => void;
  resetAuthStore: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      jwt: null,
      expiresIn: 0,
      isLoggined: false,
      isFirstLogin: true,
      setJwt: (jwt: string | null) => {
        set({ jwt: jwt });
      },
      setExpiresIn: (expiresIn: number) => {
        set({ expiresIn: expiresIn });
      },
      setIsLoggined: (isLoggined: boolean) => {
        set({ isLoggined: isLoggined });
      },
      setIsFirstLogin: (isFirstLogin: boolean) => {
        set({ isFirstLogin: isFirstLogin });
      },
      resetAuthStore: () => {
        set({
          jwt: null,
          expiresIn: 0,
          isLoggined: false,
        });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useAuthStore;
