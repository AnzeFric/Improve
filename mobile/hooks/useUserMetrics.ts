import Config from "react-native-config";
import { UserMetrics } from "@/interfaces/user";
import useAuthStore from "@/stores/useAuthStore";
import useUserMetricsStore from "@/stores/useUserMetricsStore";

export function useUserMetrics() {
  const { jwt } = useAuthStore();
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

      console.log("Failed to save user metrics: ", response.status);
      return false;
    } catch (error) {
      console.error("Error saving user metrics: ", error);
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
      console.log("Failed to fetch user metrics: ", response.status);
      return null;
    } catch (error) {
      console.error("Error fetching user metrics: ", error);
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
        return true;
      }
      console.log("Failed to delete user metrics: ", response.status);
      return false;
    } catch (error) {
      console.error("Error deleting user metrics: ", error);
      return false;
    }
  };

  const updateUserMetrics = async (
    age: number,
    weight: number,
    height: number
  ) => {
    try {
      if (!weight || !height) {
        return false;
      }

      const updatedUserMetrics: UserMetrics = {
        age: age || null,
        weight: weight,
        height: height,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/user-metrics/update`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserMetrics),
        }
      );

      const data = await response.json();

      if (data.success) {
        setUserMetrics(updatedUserMetrics);
        return true;
      }

      console.log("Failed to update user metrics: ", response.status);
      return false;
    } catch (error) {
      console.error("Error updating user metrics: ", error);
    }
  };

  return {
    userMetrics,
    saveUserMetrics,
    getUserMetrics,
    deleteUserMetrics,
    updateUserMetrics,
  };
}
