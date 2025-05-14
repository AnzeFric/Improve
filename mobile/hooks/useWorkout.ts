import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import useWorkoutStore from "@/stores/useWorkoutStore";
import { Workout, Exercise } from "@/interfaces/workout";

export function useWorkout() {
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
      const response = await BetterFetch(
        `${API_BASE_URL}/workout/create`,
        "POST",
        JSON.stringify(workout)
      );

      if (response) {
        setLatestWorkout(workout);
        return true;
      }

      console.log("Failed to save workout");
      return false;
    } catch (error) {
      console.error("Error while saving workout: ", error);
      return false;
    }
  };

  const getLatestWorkout = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/workout/`,
        "GET",
        undefined
      );

      if (response) {
        setLatestWorkout(response);
        return true;
      }

      console.log("Failed to fetch workout");
      return false;
    } catch (error) {
      console.error("Error while fetching workout: ", error);
      return false;
    }
  };

  return {
    lastestWorkout,
    handleFinishWorkout,
    getLatestWorkout,
  };
}
