import { Text, View, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";
import { Colors } from "@/constants/Colors";
import AutoComplete from "@/components/global/AutoComplete";
import { LineChart } from "react-native-gifted-charts";

const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];

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
  const [overallTimeline, setOverallTimeline] = useState<Timeline>("Day");
  const [workoutTimeline, setWorkoutTimeline] = useState<Timeline>("Day");
  const [exerciseTimeline, setExerciseTimeline] = useState<Timeline>("Day");

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
              <LineChart data={data} areaChart />
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
            <Text>Graph</Text>
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
