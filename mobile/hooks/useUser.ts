import useUserStore from "@/stores/useUserStore";

export function useUser() {
  const { firstName, lastName, dayStreak, setDayStreak } = useUserStore();

  const incrementDayStreak = () => {
    console.log("increment day streak");
    setDayStreak(dayStreak + 1);
  };

  const resetDayStreak = () => {
    console.log("reset day streak");
    setDayStreak(0);
  };

  return { firstName, lastName, dayStreak, incrementDayStreak, resetDayStreak };
}
