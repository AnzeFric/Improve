import useStreakStore from "@/stores/useStreakStore";
import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";

export function useStreak() {
  const { jwt } = useAuthStore();
  const { lastCheckIn, startStreak, setLastCheckIn, setStartStreak } =
    useStreakStore();

  const getStreakData = async () => {
    try {
      const resposne = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/streak/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await resposne.json();

      if (data.success) {
        setStartStreak(data.data.startStreak);
        setLastCheckIn(data.data.lastCheckIn);
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
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/streak/update`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startStreak: startStreak,
            lastCheckIn: lastCheckIn,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (startStreak) {
          setStartStreak(startStreak);
        }
        if (lastCheckIn) {
          setLastCheckIn(lastCheckIn);
        }
      }
    } catch (error) {
      console.error("Error updating streak last check in: ", error);
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
