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

export default function StatisticsScreen() {
  const {
    workoutOptions,
    exerciseOptions,
    getOverallData,
    getWorkoutData,
    getExerciseData,
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
        const data = await getOverallData(overallTimeline);
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
        getWorkoutExerciseOptions();
        const data = await getWorkoutData(selectedWorkout, workoutTimeline);
        setWorkoutData(data);
      } catch (error) {
        console.error("Error loading workout data:", error);
      }
    };
    loadWorkoutData();
  }, [selectedWorkout, workoutTimeline]);

  useEffect(() => {
    const loadExerciseData = async () => {
      try {
        getWorkoutExerciseOptions();
        const data = await getExerciseData(selectedExercise, exerciseTimeline);
        setExerciseData(data);
      } catch (error) {
        console.error("Error loading exercise data:", error);
      }
    };
    loadExerciseData();
  }, [selectedExercise, exerciseTimeline]);

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
                setSelectedItem={setSelectedWorkout}
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
                setSelectedItem={setSelectedExercise}
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
