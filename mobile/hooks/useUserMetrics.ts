import useUserMetricsStore from "@/stores/useUserMetricsStore";
import Config from "react-native-config";
import { UserMetrics } from "@/interfaces/user";
import { useAuth } from "./useAuth";

export function useUserMetrics() {
  const { userMetrics, setUserMetrics, resetUserMetricsStore } =
    useUserMetricsStore();
  const { jwt } = useAuth();

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
        age: age || null,
        weight: weight,
        height: height,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user-metrics/create`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserMetrics),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUserMetrics(newUserMetrics);
        return true;
      }
      return false;
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
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        const userMetrics: UserMetrics = {
          age: data.data.age || null,
          weight: data.data.weight,
          height: data.data.height,
        };

        setUserMetrics(userMetrics);
        return userMetrics;
      }
      console.log("Failed to fetch userMetrics: ", response.status);
      return null;
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
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        resetUserMetricsStore();
        return true;
      }
      console.log("Failed to delete userMetrics: ", response.status);
      return false;
    } catch (error) {
      console.error("Error while deleting userMetrics: ", error);
      return false;
    }
  };

  return {
    userMetrics,
    saveUserMetrics,
    getUserMetrics,
    deleteUserMetrics,
    resetUserMetricsStore,
  };
}
