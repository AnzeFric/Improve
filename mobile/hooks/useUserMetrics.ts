import useUserMetricsStore from "@/stores/useUserMetricsStore";
import Config from "react-native-config";
import { UserMetrics } from "@/interfaces/user";

export function useUserMetrics() {
  const { userMetrics, setUserMetrics } = useUserMetricsStore();

  const saveUserMetrics = async (
    age: number,
    weight: number,
    height: number
  ) => {
    try {
      if (!weight || !height) {
        return false;
      }

      const newUserMetrics: UserMetrics = {
        age: age | 0,
        weight: weight,
        height: height,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user-metrics/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserMetrics),
        }
      );

      if (response.ok) {
        setUserMetrics(newUserMetrics);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error while saving user metrics: ", error);
      return false;
    }
  };

  const getUserMetrics = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user-metrics/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userMetrics = await response.json();
        setUserMetrics(userMetrics);
        return userMetrics;
      } else {
        console.log("Failed to fetch userMetrics: ", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error while fetching userMetrics: ", error);
      return null;
    }
  };

  const deleteUserMetrics = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user-metrics/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setUserMetrics(null);
        return true;
      } else {
        console.log("Failed to delete userMetrics: ", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error while deleting userMetrics:  ", error);
      return false;
    }
  };

  return {
    userMetrics,
    saveUserMetrics,
    getUserMetrics,
    deleteUserMetrics,
  };
}
