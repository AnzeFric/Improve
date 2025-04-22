import useUserStore from "@/stores/useUserStore";
import Config from "react-native-config";
import { useAuth } from "./useAuth";
import { useCleanup } from "./useCleanup";
import { router } from "expo-router";

export function useUser() {
  const {
    firstName,
    lastName,
    startStreak,
    lastCheckIn,
    setFirstName,
    setLastName,
    setStartStreak,
    setLastCheckIn,
    resetUserStore,
  } = useUserStore();
  const { jwt } = useAuth();
  const { resetStores } = useCleanup();

  const updateStreak = async (
    lastCheckIn: Date | null,
    startStreak: Date | null
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
            lastCheckIn: lastCheckIn,
            startStreak: startStreak,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        if (lastCheckIn) {
          setLastCheckIn(lastCheckIn);
        }
        if (startStreak) {
          setStartStreak(startStreak);
        }
      }
    } catch (error) {
      console.error("Error updating streak last check in: ", error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user/`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);

        setStartStreak(new Date(data.data.streak.startStreak));
        setLastCheckIn(new Date(data.data.streak.lastCheckIn));
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        resetStores();
        router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const getDayStreak = async () => {
    const now = new Date();

    const lastCheckInDate = new Date(lastCheckIn);
    lastCheckInDate.setHours(0, 0, 0, 0);

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday > lastCheckInDate) {
      // Streak has been broken
      await updateStreak(now, now);
      return 1;
    }

    if (lastCheckInDate.getTime() !== today.getTime()) {
      // New day, update lastCheckIn
      await updateStreak(now, null);
    }

    const start = new Date(startStreak);
    start.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - start.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays + 1; // include start day
  };

  return {
    firstName,
    lastName,
    lastCheckIn,
    startStreak,
    getUser,
    getDayStreak,
    deleteUser,
    resetUserStore,
  };
}
