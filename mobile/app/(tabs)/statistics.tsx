import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";

export default function StatisticsScreen() {
  const [overallTimeline, setOverallTimeline] = useState<Timeline>("Day");
  const [workoutTimeline, setWorkoutTimeline] = useState<Timeline>("Day");
  const [exerciseTimeline, setExerciseTimeline] = useState<Timeline>("Day");

  return (
    <View>
      <TitleRow title={"Statistics"} hasBackButton={false} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Overall</Text>
          <DaySelector
            timeline={overallTimeline}
            setTimeline={setOverallTimeline}
          />
          <Text>Graph</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Workout</Text>
          <DaySelector
            timeline={workoutTimeline}
            setTimeline={setWorkoutTimeline}
          />
          <Text>Graph</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Exercise</Text>
          <DaySelector
            timeline={exerciseTimeline}
            setTimeline={setExerciseTimeline}
          />
          <Text>Graph</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 20,
  },
  contentContainer: {
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
});
