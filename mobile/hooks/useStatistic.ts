import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import { Timeline } from "@/interfaces/statistics";
import { Exercise, Workout } from "@/interfaces/workout";
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

  function weekCount(year: number, monthNumber: number) {
    // monthNumber range: 1..12

    var firstOfMonth = new Date(year, monthNumber - 1, 1);
    var lastOfMonth = new Date(year, monthNumber, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
  }

  function formatData(
    data: Array<Workout> | Array<Exercise>,
    timeline: Timeline
  ) {}

  function setWorkoutExerciseOptions(workoutData: Array<Workout>) {
    let tempWorkoutOptions: Array<string> = [];
    let tempExerciseOptions: Array<string> = [];

    workoutData.forEach((workout: Workout) => {
      const workoutName = workout.name;
      if (!tempWorkoutOptions.includes(workoutName)) {
        tempWorkoutOptions.push(workout.name);
      }
      workout.exercises.forEach((exercise: Exercise) => {
        const exerciseName = exercise.name;
        if (!tempExerciseOptions.includes(exerciseName)) {
          tempExerciseOptions.push(exercise.name);
        }
      });
    });

    setWorkoutOptions(tempWorkoutOptions);
    setExerciseOptions(tempExerciseOptions);
  }

  const getOverallData = async (timeline: Timeline) => {
    // TODO: Check oldest workout. If it's less than 1 year use the dataYear format, else display the last 5 years using the dataMonth format.
    const workoutData = await getAllWorkouts(timeline);
    if (0 >= workoutOptions.length || 0 >= exerciseOptions.length) {
      setWorkoutExerciseOptions(workoutData);
    }
    return null;
  };

  const getWorkoutData = async (workoutName: String, timeline: Timeline) => {
    const workoutData = await getSpecificWorkouts(workoutName, timeline);

    return null;
  };

  const getExerciseData = async (exerciseName: String, timeline: Timeline) => {
    const exerciseData = await getSpecificExercises(exerciseName, timeline);

    return null;
  };

  return {
    workoutOptions,
    exerciseOptions,
    getOverallData,
    getWorkoutData,
    getExerciseData,
  };
}
