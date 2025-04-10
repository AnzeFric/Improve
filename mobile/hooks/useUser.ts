import useUserStore from "@/stores/useUserStore";
import Config from "react-native-config";
import { useAuth } from "./useAuth";
import { useCleanup } from "./useCleanup";
import { router } from "expo-router";

export function useUser() {
  const {
    firstName,
    lastName,
    dayStreak,
    setFirstName,
    setLastName,
    setDayStreak,
    resetUserStore,
  } = useUserStore();
  const { jwt } = useAuth();
  const { resetStores } = useCleanup();

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
        setDayStreak(data.data.dayStreak);
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

  const incrementDayStreak = () => {
    console.log("increment day streak");
    setDayStreak(dayStreak + 1);
  };

  const resetDayStreak = () => {
    console.log("reset day streak");
    setDayStreak(0);
  };

  return {
    firstName,
    lastName,
    dayStreak,
    getUser,
    incrementDayStreak,
    resetDayStreak,
    deleteUser,
    resetUserStore,
  };
}
