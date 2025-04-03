import {
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";
import { Colors } from "@/constants/Colors";
import AutoComplete from "@/components/global/AutoComplete";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

const data: Array<lineDataItem> = [
  { value: 50, label: "M", secondaryLabel: "h" },
  { value: 10, label: "T", secondaryLabel: "h" },
  { value: 50, label: "W", secondaryLabel: "h" },
  { value: 10, label: "T", secondaryLabel: "h" },
  { value: 50, label: "F", secondaryLabel: "h" },
  { value: 50, label: "S", secondaryLabel: "h" },
  { value: 50, label: "S", secondaryLabel: "h" },
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

const windowWidth = Dimensions.get("window").width;

export default function StatisticsScreen() {
  const [overallTimeline, setOverallTimeline] = useState<Timeline>("Week");
  const [workoutTimeline, setWorkoutTimeline] = useState<Timeline>("Week");
  const [exerciseTimeline, setExerciseTimeline] = useState<Timeline>("Week");

  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

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
              <LineChart
                data={data}
                width={windowWidth * 0.815}
                spacing={windowWidth * 0.125}
                xAxisLabelTextStyle={{ fontSize: 14 }}
                xAxisIndicesColor={"transparent"}
                yAxisIndicesColor={"transparent"}
                endSpacing={0}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Workout</Text>
            <AutoComplete
              placeholder={"Choose workout"}
              searchOptions={workoutOptions}
              isFocused={showWorkout}
              setIsFocused={setShowWorkout}
              onPress={() => {
                setShowExercise(false);
              }}
            />
            <DaySelector
              timeline={workoutTimeline}
              setTimeline={setWorkoutTimeline}
            />
            <View style={styles.chartContainer}>
              <LineChart
                data={data}
                width={windowWidth * 0.815}
                spacing={windowWidth * 0.125}
                xAxisLabelTextStyle={{ fontSize: 14 }}
                xAxisIndicesColor={"transparent"}
                yAxisIndicesColor={"transparent"}
                endSpacing={0}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Exercise</Text>
            <AutoComplete
              placeholder={"Choose exercise"}
              searchOptions={exerciseOptions}
              isFocused={showExercise}
              setIsFocused={setShowExercise}
              onPress={() => setShowWorkout(false)}
            />
            <DaySelector
              timeline={exerciseTimeline}
              setTimeline={setExerciseTimeline}
            />
            <View style={styles.chartContainer}>
              <LineChart data={data} areaChart />
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
  },
  chartContainer: {
    paddingTop: 10,
    width: "100%",
    paddingRight: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.light.specialBlue,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
});
