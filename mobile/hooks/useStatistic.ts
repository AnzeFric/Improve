import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import { Timeline } from "@/interfaces/statistics";

export function useStatistic() {
  const { jwt } = useAuthStore();

  const getAllWorkouts = async (timeline: Timeline) => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/workout`,
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
        return data.data; // Array of workouts, their exercises and sets
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
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/statistic/workout/specific`,
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

      if (data.success) {
        return data.data; // Array of workouts, their exercises and sets
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

      if (data.success) {
        return data.data; // Array of exercises and their sets
      }
      return null;
    } catch (error) {
      console.error("Error fetching exercise data", error);
      return null;
    }
  };

  const getOverallData = async (timeline: Timeline) => {
    const data = getAllWorkouts(timeline);

    return null;
  };

  const getWorkoutData = async (workoutName: String, timeline: Timeline) => {
    const data = getSpecificWorkouts(workoutName, timeline);

    return null;
  };

  const getExerciseData = async (exerciseName: String, timeline: Timeline) => {
    const data = getSpecificExercises(exerciseName, timeline);

    return null;
  };

  return {
    getOverallData,
    getWorkoutData,
    getExerciseData,
  };
}
