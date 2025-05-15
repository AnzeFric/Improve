import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import { Timeline } from "@/interfaces/statistics";
import useStatisticStore from "@/stores/useStatisticStore";
import { lineDataItem } from "react-native-gifted-charts";
import { Exercise, Set } from "@/interfaces/workout";

export function useStatistic() {
  const {
    workoutOptions,
    exerciseOptions,
    setWorkoutOptions,
    setExerciseOptions,
  } = useStatisticStore();

  const getAllWorkouts = async (timeline: Timeline) => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/statistic/overall`,
        "POST",
        JSON.stringify(timeline)
      );

      if (response) {
        return response.list;
      }

      console.log("Failed to fetch overall data");
      return null;
    } catch (error) {
      console.error("Error fetching overall data:", error);
      return null;
    }
  };

  const getSpecificWorkouts = async (
    workoutName: String,
    timeline: Timeline
  ) => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/statistic/workout`,
        "POST",
        JSON.stringify({
          workoutName: workoutName,
          timeline: timeline,
        })
      );

      if (response) {
        return response.list;
      }

      console.log("Failed to fetch workout data");
      return null;
    } catch (error) {
      console.error("Error fetching workout data:", error);
      return null;
    }
  };

  const getSpecificExercises = async (
    exerciseName: String,
    timeline: Timeline
  ) => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/statistic/exercise`,
        "POST",
        JSON.stringify({
          exerciseName: exerciseName,
          timeline: timeline,
        })
      );

      if (response) {
        return response.list;
      }

      console.log("Failed to fetch exercise data");
      return null;
    } catch (error) {
      console.error("Error fetching exercise data:", error);
      return null;
    }
  };

  const getWorkoutExerciseOptions = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/statistic/options`,
        "GET",
        undefined
      );

      if (response) {
        setWorkoutOptions(response.workoutOptions);
        setExerciseOptions(response.exerciseOptions);
        return true;
      }

      console.log("Failed to fetch workout and exercise options");
      return false;
    } catch (error) {
      console.error("Error fetching workout and exercise options:", error);
      return false;
    }
  };

  function getMonthLabel(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month}`;
  }

  function getYearLabel(date: Date): string {
    const yearLabels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const monthIndex = date.getMonth();
    return yearLabels[monthIndex];
  }

  function getAllLabel(date: Date): string {
    return `${date.getUTCFullYear()}`;
  }

  function getLabelFunction(timeline: Timeline, oldestData: Date) {
    let labelFun: (date: Date) => string;

    switch (timeline) {
      case "Month":
        labelFun = getMonthLabel;
        break;
      case "Year":
        labelFun = getYearLabel;
        break;
      case "All":
        const now = new Date();

        if (oldestData.getFullYear() === now.getFullYear()) {
          // Oldest data is in the same year
          labelFun = getYearLabel;
        } else {
          // Oldest data is at least 2 years old, use years for labels
          labelFun = getAllLabel;
        }
        break;
    }
    return labelFun;
  }

  function getChartData(data: any, getLabel: (dataItem: any) => string) {
    const chartData: Array<lineDataItem> = [];

    data.forEach((dataItem: any) => {
      const date = new Date(dataItem.dateTo);
      const label = getLabel(date);
      let tempValue = 0;
      dataItem.exercises.forEach((exercise: Exercise) => {
        exercise.sets.forEach((set: Set) => {
          tempValue += set.reps * set.weight;
        });
      });
      chartData.push({ value: tempValue, label: label });
    });

    return chartData;
  }

  const getOverallData = async (timeline: Timeline) => {
    const data = await getAllWorkouts(timeline);
    if (data != null) {
      const oldestData = new Date(data[0].dateTo);
      let labelFun: (date: Date) => string = getLabelFunction(
        timeline,
        oldestData
      );
      const chartData: Array<lineDataItem> = getChartData(data, labelFun);
      return chartData;
    }
    return [];
  };

  const getWorkoutData = async (workoutName: String, timeline: Timeline) => {
    const data = await getSpecificWorkouts(workoutName, timeline);
    if (data != null) {
      const oldestData = new Date(data[0].dateTo);
      let labelFun: (date: Date) => string = getLabelFunction(
        timeline,
        oldestData
      );
      const chartData: Array<lineDataItem> = getChartData(data, labelFun);
      return chartData;
    }
    return [];
  };

  const getExerciseData = async (exerciseName: String, timeline: Timeline) => {
    const data = await getSpecificExercises(exerciseName, timeline);
    if (data != null) {
      const oldestData = new Date(data[0].dateTo);
      let labelFun: (date: Date) => string = getLabelFunction(
        timeline,
        oldestData
      );
      const chartData: Array<lineDataItem> = getChartData(data, labelFun);
      return chartData;
    }
    return [];
  };

  return {
    workoutOptions,
    exerciseOptions,
    getOverallData,
    getWorkoutData,
    getExerciseData,
    getWorkoutExerciseOptions,
    setWorkoutOptions,
    setExerciseOptions,
  };
}
