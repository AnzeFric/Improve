import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import EncryptedStorage from "react-native-encrypted-storage";
import { UserMetrics } from "@/interfaces/user";

interface UserMetricsStore {
  userMetrics: UserMetrics | null;
  setUserMetrics: (userMetrics: UserMetrics | null) => void;
}

const useUserMetricsStore = create(
  persist<UserMetricsStore>(
    (set) => ({
      userMetrics: null,
      setUserMetrics: async (userMetrics: UserMetrics | null) => {
        set({
          userMetrics: userMetrics,
        });
      },
    }),
    {
      name: "userMetricsStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useUserMetricsStore;
