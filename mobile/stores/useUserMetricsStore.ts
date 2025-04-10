import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserMetrics } from "@/interfaces/user";
import EncryptedStorage from "react-native-encrypted-storage";

interface UserMetricsStore {
  userMetrics: UserMetrics | null;
  setUserMetrics: (userMetrics: UserMetrics | null) => void;
}

const useUserMetricsStore = create(
  persist<UserMetricsStore>(
    (set) => ({
      userMetrics: null,
      setUserMetrics: (userMetrics: UserMetrics | null) => {
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
