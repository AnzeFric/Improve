import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import { Timeline } from "@/interfaces/statistics";
import useStatisticStore from "@/stores/useStatisticStore";

export function useStatistic() {
  const { jwt } = useAuthStore();
  const {
    workoutOptions,
    exerciseOptions,
    setWorkoutOptions,
    setExerciseOptions,
  } = useStatisticStore();

  const getAllWorkouts = async (timeline: Timeline) => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/overall`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timeline),
        }
      );

      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching workout data", error);
      return null;
    }
  };

  const getSpecificWorkouts = async (
    workoutName: String,
    timeline: Timeline
  ) => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/workout`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workoutName: workoutName,
            timeline: timeline,
          }),
        }
      );

      const data = await response.json();

      return null; // TODO: remove

      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching workout data", error);
      return null;
    }
  };

  const getSpecificExercises = async (
    exerciseName: String,
    timeline: Timeline
  ) => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/exercise`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exerciseName: exerciseName,
            timeline: timeline,
          }),
        }
      );

      const data = await response.json();

      return null; // TODO: remove

      if (data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching exercise data", error);
      return null;
    }
  };

  const getWorkoutExerciseOptions = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/options`,
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
        setWorkoutOptions(data.data.workoutOptions);
        setExerciseOptions(data.data.exerciseOptions);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching workout and exercise options", error);
      return false;
    }
  };

  return {
    workoutOptions,
    exerciseOptions,
    getAllWorkouts,
    getSpecificWorkouts,
    getSpecificExercises,
    getWorkoutExerciseOptions,
  };
}
