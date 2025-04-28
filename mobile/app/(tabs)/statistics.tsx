import { Text, View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState, useMemo } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";
import { Colors } from "@/constants/Colors";
import InputDropDown from "@/components/global/InputDropDown";
import { lineDataItem } from "react-native-gifted-charts";
import Charts from "@/components/statistics/Charts";

const dataWeek: Array<lineDataItem> = [
  { value: 10, label: "M" },
  { value: 0, label: "T" },
  { value: 0, label: "W" },
  { value: 0, label: "T" },
  { value: 0, label: "F" },
  { value: 0, label: "S" },
  { value: 0, label: "S" },
];

const dataMonth: Array<lineDataItem> = [
  { value: 0, label: "1.4" },
  { value: 0, label: "7.4" },
  { value: 0, label: "14.4" },
  { value: 0, label: "21.4" },
  { value: 0, label: "28.4" },
];

const dataYear: Array<lineDataItem> = [
  { value: 0, label: "JAN" },
  { value: 0, label: "FEB" },
  { value: 0, label: "MAR" },
  { value: 0, label: "APR" },
  { value: 0, label: "MAY" },
  { value: 0, label: "JUN" },
  { value: 0, label: "JUL" },
  { value: 0, label: "AVG" },
  { value: 0, label: "SEP" },
  { value: 0, label: "OCT" },
  { value: 0, label: "NOV" },
  { value: 0, label: "DEC" },
];

const workoutOptions = [
  "Pull day",
  "Push day",
  "Leg day",
  "Upper body",
  "Lower body",
  "Full body",
  "Biceps",
  "Biceps",
  "Biceps",
];

const exerciseOptions = [
  "Biceps curl",
  "Lat pulldown",
  "Flat bench",
  "Incline bench",
  "Machine row",
  "Cable row",
  "Deadlift",
];

export default function StatisticsScreen() {
  const [overallTimeline, setOverallTimeline] = useState<Timeline>("Week");
  const [workoutTimeline, setWorkoutTimeline] = useState<Timeline>("Week");
  const [exerciseTimeline, setExerciseTimeline] = useState<Timeline>("Week");

  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  const getDataForTimeline = (timeline: Timeline) => {
    switch (timeline) {
      case "Week":
        return dataWeek;
      case "Month":
        return dataMonth;
      case "Year":
        return dataYear;
    }
  };

  const overallData = useMemo(
    () => getDataForTimeline(overallTimeline),
    [overallTimeline]
  );

  const workoutData = useMemo(
    () => getDataForTimeline(workoutTimeline),
    [workoutTimeline]
  );

  const exerciseData = useMemo(
    () => getDataForTimeline(exerciseTimeline),
    [exerciseTimeline]
  );

  const handleUnFocus = () => {
    setShowWorkout(false);
    setShowExercise(false);
  };

  return (
    <Pressable onPress={handleUnFocus} style={styles.scrollContainer}>
      <ScrollView style={styles.scrollContainer}>
        <TitleRow title={"Statistics"} hasBackButton={false} />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Overall</Text>
            <DaySelector
              timeline={overallTimeline}
              setTimeline={setOverallTimeline}
            />
            <View style={styles.chartContainer}>
              <Charts data={overallData} timePeriod={overallTimeline} />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Workout</Text>
            <View style={styles.inputContainer}>
              <InputDropDown
                placeholder={"Choose workout"}
                searchOptions={workoutOptions}
                isFocused={showWorkout}
                setIsFocused={setShowWorkout}
                onPress={() => {
                  setShowExercise(false);
                }}
              />
            </View>

            <DaySelector
              timeline={workoutTimeline}
              setTimeline={setWorkoutTimeline}
            />
            <View style={styles.chartContainer}>
              <Charts data={workoutData} timePeriod={workoutTimeline} />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Exercise</Text>
            <View style={styles.inputContainer}>
              <InputDropDown
                placeholder={"Choose exercise"}
                searchOptions={exerciseOptions}
                isFocused={showExercise}
                setIsFocused={setShowExercise}
                onPress={() => setShowWorkout(false)}
              />
            </View>
            <DaySelector
              timeline={exerciseTimeline}
              setTimeline={setExerciseTimeline}
            />
            <View style={styles.chartContainer}>
              <Charts data={exerciseData} timePeriod={exerciseTimeline} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 20,
  },
  contentContainer: {
    gap: 10,
    borderWidth: 3,
    borderColor: Colors.light.underlayOrange,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
  },
  chartContainer: {
    paddingVertical: 10,
    width: "100%",
    paddingRight: 20,
  },
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    backgroundColor: Colors.light.underlayOrange,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
});
