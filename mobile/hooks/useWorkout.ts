import Config from "react-native-config";
import { Workout, Exercise } from "@/interfaces/workout";
import useAuthStore from "@/stores/useAuthStore";

export function useWorkout() {
  const { userId } = useAuthStore();

  const handleFinishWorkout = async (
    name: string,
    date: Date,
    exercises: Array<Exercise>
  ) => {
    try {
      const dateString = date.toISOString();

      const workout: Workout = {
        userId: userId,
        name: name,
        date: dateString,
        exercises: exercises,
      };

      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/workout/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        }
      );

      if (response.ok) {
        return true;
      }

      console.log(`Failed to save workout: ${response.status}`);
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
