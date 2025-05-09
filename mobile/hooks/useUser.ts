import { router } from "expo-router";
import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import { resetAllStores } from "@/constants/Utils";

export function useUser() {
  const { firstName, lastName, setFirstName, setLastName } = useUserStore();
  const { jwt } = useAuthStore();

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
        resetAllStores();
        router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return {
    firstName,
    lastName,
    getUser,
    deleteUser,
  };
}
