import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserMetrics } from "@/interfaces/user";
import EncryptedStorage from "react-native-encrypted-storage";

interface UserMetricsStore {
  userMetrics: UserMetrics | null;
  setUserMetrics: (userMetrics: UserMetrics | null) => void;
  reset: () => void;
}

const initialState = {
  userMetrics: null,
};

const useUserMetricsStore = create(
  persist<UserMetricsStore>(
    (set) => ({
      ...initialState,
      setUserMetrics: (userMetrics: UserMetrics | null) => {
        set({
          userMetrics: userMetrics,
        });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useUserMetricsStore.persist.clearStorage();
      },
    }),
    {
      name: "userMetricsStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useUserMetricsStore;
