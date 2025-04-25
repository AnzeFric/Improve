import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import useSplitStore from "@/stores/useSplitStore";
import useStreakStore from "@/stores/useStreakStore";
import useWorkoutStore from "@/stores/useWorkoutStore";
import useUserMetricsStore from "@/stores/useUserMetricsStore";

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months start at 0
  const day = date.getDate();

  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${paddedDay}. ${paddedMonth}. ${year}`;
}

export function formatDateTime(dateTime: Date): string {
  const date = formatDate(dateTime);

  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();

  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");

  return `${date}, ${paddedHour}:${paddedMinute}`;
}

export function resetAllStores() {
  useAuthStore.getState().reset();
  useUserStore.getState().reset();
  useSplitStore.getState().reset();
  useStreakStore.getState().reset();
  useUserMetricsStore.getState().reset();
  useWorkoutStore.getState().reset();
}
