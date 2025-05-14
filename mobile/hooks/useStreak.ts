import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import useStreakStore from "@/stores/useStreakStore";

export function useStreak() {
  const { lastCheckIn, startStreak, setLastCheckIn, setStartStreak } =
    useStreakStore();

  const getStreakData = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/streak/`,
        "GET",
        undefined
      );

      if (response) {
        setStartStreak(response.startStreak);
        setLastCheckIn(response.lastCheckIn);
      } else {
        console.log("Failed to fetch streak");
      }
    } catch (error) {
      console.error("Error fetching streak: ", error);
    }
  };

  const updateStreak = async (
    startStreak: Date | null,
    lastCheckIn: Date | null
  ) => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/streak/update`,
        "POST",
        JSON.stringify({
          startStreak: startStreak,
          lastCheckIn: lastCheckIn,
        })
      );

      if (response) {
        if (startStreak) {
          setStartStreak(startStreak);
        }
        if (lastCheckIn) {
          setLastCheckIn(lastCheckIn);
        }
      } else {
        console.log("Failed to update streak and last check in");
      }
    } catch (error) {
      console.error("Error updating streak and last check in: ", error);
    }
  };

  const updateDayStreak = async () => {
    const now = new Date();

    const lastCheckInDate = new Date(lastCheckIn);
    lastCheckInDate.setHours(0, 0, 0, 0);

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday > lastCheckInDate) {
      // Streak has been broken, reset startStreak and lastCheckIn
      await updateStreak(now, now);
    } else if (lastCheckInDate.getTime() !== today.getTime()) {
      // New day or login in the same day, update lastCheckIn
      await updateStreak(null, now);
    }
  };

  const getDays = () => {
    const { startStreak } = useStreakStore.getState(); // Grab directly from store. Else it uses old values

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startStreak);
    start.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - start.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays + 1; // include start day
  };

  return { lastCheckIn, startStreak, getStreakData, updateDayStreak, getDays };
}
