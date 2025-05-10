import Config from "react-native-config";
import useAuthStore from "@/stores/useAuthStore";
import { Timeline } from "@/interfaces/statistics";
import useStatisticStore from "@/stores/useStatisticStore";
import { lineDataItem } from "react-native-gifted-charts";
import { Exercise, Set } from "@/interfaces/workout";

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
      "AVG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const monthIndex = date.getMonth();
    return yearLabels[monthIndex];
  }

  function getAllLabel(date: Date): string {
    return `${date.getFullYear()}`;
  }

  function getChartData(data: any, getLabel: (dataItem: any) => string) {
    const chartData: Array<lineDataItem> = [];

    data.forEach((dataItem: any) => {
      const label = getLabel(dataItem);
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
    let labelFun: (date: Date) => string;

    switch (timeline) {
      case "Month":
        labelFun = getMonthLabel;
        break;
      case "Year":
        labelFun = getYearLabel;
        break;
      case "All":
        const oldestData: Date = data[0].dateTo;
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

    const chartData: Array<lineDataItem> = getChartData(data, labelFun);
    return chartData;
  };

  const getWorkoutData = async (workoutName: String, timeline: Timeline) => {
    const data = await getSpecificWorkouts(workoutName, timeline);
    let labelFun: (date: Date) => string;

    switch (timeline) {
      case "Month":
        labelFun = getMonthLabel;
        break;
      case "Year":
        labelFun = getYearLabel;
        break;
      case "All":
        labelFun = getAllLabel;
        break;
    }

    const chartData: Array<lineDataItem> = getChartData(data, labelFun);
    return chartData;
  };

  const getExerciseData = async (exerciseName: String, timeline: Timeline) => {
    const data = await getSpecificExercises(exerciseName, timeline);
    let labelFun: (date: Date) => string;

    switch (timeline) {
      case "Month":
        labelFun = getMonthLabel;
        break;
      case "Year":
        labelFun = getYearLabel;
        break;
      case "All":
        labelFun = getAllLabel;
        break;
    }

    const chartData: Array<lineDataItem> = getChartData(data, labelFun);
    return chartData;
  };

  return {
    workoutOptions,
    exerciseOptions,
    getOverallData,
    getWorkoutData,
    getExerciseData,
    getWorkoutExerciseOptions,
  };
}
