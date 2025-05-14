import { UserMetrics } from "@/interfaces/user";
import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import useUserMetricsStore from "@/stores/useUserMetricsStore";

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
        age: age || null,
        weight: weight,
        height: height,
      };

      const response = await BetterFetch(
        `${API_BASE_URL}/user-metrics/create`,
        "POST",
        JSON.stringify(newUserMetrics)
      );

      if (response) {
        setUserMetrics(newUserMetrics);
        return true;
      }

      console.log("Failed to save user metrics");
      return false;
    } catch (error) {
      console.error("Error saving user metrics: ", error);
      return false;
    }
  };

  const getUserMetrics = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/user-metrics/`,
        "GET",
        undefined
      );

      if (response) {
        const userMetrics: UserMetrics = {
          age: response.age || null,
          weight: response.weight,
          height: response.height,
        };

        setUserMetrics(userMetrics);
        return userMetrics;
      }

      console.log("Failed to fetch user metrics");
      return null;
    } catch (error) {
      console.error("Error fetching user metrics: ", error);
      return null;
    }
  };

  const deleteUserMetrics = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/user-metrics/delete`,
        "DELETE",
        undefined
      );

      if (response) {
        return true;
      }

      console.log("Failed to delete user metrics");
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

      const response = await BetterFetch(
        `${API_BASE_URL}/user-metrics/update`,
        "PUT",
        JSON.stringify(updatedUserMetrics)
      );

      if (response) {
        setUserMetrics(updatedUserMetrics);
        return true;
      }

      console.log("Failed to update user metrics");
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
