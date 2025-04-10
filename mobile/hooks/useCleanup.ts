import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import useUserMetricsStore from "@/stores/useUserMetricsStore";

export function useCleanup() {
  const { resetAuthStore } = useAuthStore();
  const { resetUserStore } = useUserStore();
  const { resetUserMetricsStore } = useUserMetricsStore();

  const resetStores = () => {
    resetAuthStore();
    resetUserStore();
    resetUserMetricsStore();
  };

  return { resetStores };
}
