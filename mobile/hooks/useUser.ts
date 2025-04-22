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
    setFirstName,
    setLastName,
    setStartStreak,
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
        setStartStreak(new Date(data.data.streak.startStreak));
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

  const getDayStreak = () => {
    const start = new Date(startStreak);
    const today = new Date();

    // Reset h, m, s to compare days only
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays + 1; // include start day (+1)
  };

  return {
    firstName,
    lastName,
    getUser,
    getDayStreak,
    deleteUser,
    resetUserStore,
  };
}
