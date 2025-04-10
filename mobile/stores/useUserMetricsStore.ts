import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserMetrics } from "@/interfaces/user";

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserMetricsStore;
