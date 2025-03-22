import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";

interface AuthStore {
  userId: string | null;
  setUserId: (userId: string) => void;

  jwtKey: string | null;
  setJwtKey: (jwtKey: string | null) => void; // For later implementation, also add logout to set jwt to null

  isLoggined: boolean;
  setIsLoggined: (isLoggined: boolean) => void; // Temp implementation
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      userId: null,
      jwtKey: null,
      isLoggined: false,
      setUserId: async (userId: string) => {
        set({ userId: userId });
      },
      setJwtKey: async (jwtKey: string | null) => {
        set({ jwtKey: jwtKey });
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
