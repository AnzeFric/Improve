import useUserStore from "@/stores/useUserStore";
import Config from "react-native-config";
import { useAuth } from "./useAuth";

export function useUser() {
  const {
    firstName,
    lastName,
    dayStreak,
    setFirstName,
    setLastName,
    setDayStreak,
  } = useUserStore();
  const { jwt } = useAuth();

  const getUser = async () => {
    try {
      console.log("Trigger get user");
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
        console.log("Response saved");
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setDayStreak(data.data.dayStreak);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  const deleteUser = () => {
    console.log("Account delete clicked");
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
  };
}
