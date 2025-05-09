import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import useWorkoutStore from "@/stores/useWorkoutStore";
import { Workout, Exercise } from "@/interfaces/workout";

export function useWorkout() {
  const { jwt } = useAuthStore();
  const { lastestWorkout, setLatestWorkout } = useWorkoutStore();

  const handleFinishWorkout = async (
    name: string,
    date: Date,
    exercises: Array<Exercise>
  ) => {
    try {
      const workout: Workout = {
        name: name,
        date: date,
        exercises: exercises,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/workout/create`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        }
      );

      const data = await response.json();

      if (data.success) {
        setLatestWorkout(workout);
        return true;
      }

      console.log("Failed to save workout!");
      return false;
    } catch (error) {
      console.error("Error while saving workout: ", error);
      return false;
    }
  };

  const getLatestWorkout = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/workout/`,
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
        setLatestWorkout(data.data);
      }
    } catch (error) {
      console.error("Error while fetching workout: ", error);
    }
  };

  return {
    lastestWorkout,
    handleFinishWorkout,
    getLatestWorkout,
  };
}
