import {
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";
import { Colors } from "@/constants/Colors";
import InputDropDown from "@/components/global/InputDropDown";
import { lineDataItem } from "react-native-gifted-charts";
import Charts from "@/components/statistics/Charts";
import { useStatistic } from "@/hooks/useStatistic";

const dataWeek: Array<lineDataItem> = [
  { value: 0, label: "M" },
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

export default function StatisticsScreen() {
  const {
    workoutOptions,
    exerciseOptions,
    getAllWorkouts,
    getSpecificWorkouts,
    getSpecificExercises,
    getWorkoutExerciseOptions,
  } = useStatistic();
  const [overallTimeline, setOverallTimeline] = useState<Timeline>("Month");
  const [workoutTimeline, setWorkoutTimeline] = useState<Timeline>("Month");
  const [exerciseTimeline, setExerciseTimeline] = useState<Timeline>("Month");

  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");

  const [overallData, setOverallData] = useState<Array<lineDataItem> | null>(
    null
  );
  const [workoutData, setWorkoutData] = useState<Array<lineDataItem> | null>(
    null
  );
  const [exerciseData, setExerciseData] = useState<Array<lineDataItem> | null>(
    null
  );

  const [showWorkout, setShowWorkout] = useState(false);
  const [showExercise, setShowExercise] = useState(false);

  useEffect(() => {
    const loadOverallData = async () => {
      try {
        const [optionsSuccess, data] = await Promise.all([
          getWorkoutExerciseOptions(),
          getAllWorkouts(overallTimeline),
        ]);

        setOverallData(data);
      } catch (error) {
        console.error("Error loading overall data:", error);
      }
    };
    loadOverallData();
  }, [overallTimeline]);

  useEffect(() => {
    const loadWorkoutData = async () => {
      try {
        const data = await getSpecificWorkouts(
          selectedWorkout,
          workoutTimeline
        );
        setWorkoutData(data);
      } catch (error) {
        console.error("Error loading workout data:", error);
      }
    };
    loadWorkoutData();
  }, [workoutTimeline]);

  useEffect(() => {
    const loadExerciseData = async () => {
      try {
        const data = await getSpecificExercises(
          selectedExercise,
          exerciseTimeline
        );
        setExerciseData(data);
      } catch (error) {
        console.error("Error loading exercise data:", error);
      }
    };
    loadExerciseData();
  }, [exerciseTimeline]);

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
            <View style={{ paddingTop: 10 }}>
              <DaySelector
                timeline={overallTimeline}
                setTimeline={setOverallTimeline}
              />
            </View>
            <View style={styles.chartContainer}>
              {overallData ? (
                <Charts data={overallData} timePeriod={overallTimeline} />
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size={"large"}
                    color={Colors.light.specialBlue}
                  />
                  <Text style={styles.loadingText}>Loading data...</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Workout</Text>
            <View style={styles.inputContainer}>
              <InputDropDown
                value={selectedWorkout}
                setValue={setSelectedWorkout}
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
              {workoutData ? (
                <Charts data={workoutData} timePeriod={workoutTimeline} />
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size={"large"}
                    color={Colors.light.specialBlue}
                  />
                  <Text style={styles.loadingText}>Loading data...</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Exercise</Text>
            <View style={styles.inputContainer}>
              <InputDropDown
                value={selectedExercise}
                setValue={setSelectedExercise}
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
              {exerciseData ? (
                <Charts data={exerciseData} timePeriod={exerciseTimeline} />
              ) : (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size={"large"}
                    color={Colors.light.specialBlue}
                  />
                  <Text style={styles.loadingText}>Loading data...</Text>
                </View>
              )}
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
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    color: Colors.light.specialBlue,
    fontWeight: "bold",
  },
});
