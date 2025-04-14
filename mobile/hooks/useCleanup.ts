import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import useUserMetricsStore from "@/stores/useUserMetricsStore";
import useSplitStore from "@/stores/useSplitStore";

export function useCleanup() {
  const { resetAuthStore } = useAuthStore();
  const { resetUserStore } = useUserStore();
  const { resetUserMetricsStore } = useUserMetricsStore();
  const { resetSplitStore } = useSplitStore();

  const resetStores = () => {
    resetAuthStore();
    resetUserStore();
    resetUserMetricsStore();
    resetSplitStore();
  };

  return { resetStores };
}
