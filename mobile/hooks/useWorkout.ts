import Config from "react-native-config";
import { Workout, Exercise } from "@/interfaces/workout";
import { useAuth } from "./useAuth";

export function useWorkout() {
  const { jwt } = useAuth();

  const handleFinishWorkout = async (
    name: string,
    date: Date,
    exercises: Array<Exercise>
  ) => {
    try {
      const dateString = date.toISOString();

      const workout: Workout = {
        name: name,
        date: dateString,
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
        return true;
      }

      console.log("Failed to save workout!");
      return false;
    } catch (error) {
      console.error("Error while saving workout: ", error);
      return false;
    }
  };

  return {
    handleFinishWorkout,
  };
}
