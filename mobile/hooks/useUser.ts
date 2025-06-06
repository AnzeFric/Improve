import { router } from "expo-router";
import useUserStore from "@/stores/useUserStore";
import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import { resetAllStores } from "@/constants/Utils";

export function useUser() {
  const {
    firstName,
    lastName,
    firstLogin,
    setFirstName,
    setLastName,
    setFirstLogin,
  } = useUserStore();

  const getUser = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/user/`,
        "GET",
        undefined
      );

      if (response) {
        setFirstName(response.firstName);
        setLastName(response.lastName);
        return true;
      }

      console.log("Failed to get user");
      return false;
    } catch (error) {
      console.error("Error fetching user: ", error);
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/user/delete`,
        "DELETE",
        undefined
      );

      if (response) {
        resetAllStores();
        router.replace("/(auth)/login");
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return {
    firstName,
    lastName,
    firstLogin,
    getUser,
    deleteUser,
    setFirstLogin,
  };
}
