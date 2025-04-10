import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Workout } from "@/interfaces/workout";
import WorkoutDisplay from "./WorkoutDisplay";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "@/constants/AppStyles";

const fakeWorkout: Workout = {
  name: "Pull day",
  date: new Date().toDateString(),
  exercises: [
    {
      name: "Biceps curl",
      numSets: 3,
      sets: [
        {
          reps: 2,
          weight: 14,
        },
        {
          reps: 5,
          weight: 18,
        },
        {
          reps: 3,
          weight: 20,
        },
      ],
    },
    {
      name: "Lat pulldown",
      numSets: 5,
      sets: [
        {
          reps: 2,
          weight: 20,
        },
        {
          reps: 2,
          weight: 40,
        },
        {
          reps: 3,
          weight: 60,
        },
        {
          reps: 5,
          weight: 60,
        },
        {
          reps: 8,
          weight: 50,
        },
      ],
    },
  ],
};

export default function MostRecentWorkout() {
  const [recentWorkout, setRecentWorkout] = useState(fakeWorkout);

  useEffect(() => {
    // Load recent workout from api
  }, []);

  const handlePress = () => {
    console.log("Redo recent workout click");
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Ionicons style={styles.icon} name={"barbell"} size={24} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Most Recent Workout</Text>

          <View style={styles.workoutTitleContainer}>
            <Text style={styles.workoutName}>{recentWorkout.name}</Text>
            <Text style={styles.workoutDate}>
              {/*formatDate(recentWorkout.date)*/}
              {recentWorkout.date}
            </Text>
          </View>
        </View>
      </View>

      <WorkoutDisplay workout={recentWorkout} />

      <TouchableOpacity style={AppStyles.button} onPress={handlePress}>
        <Text style={AppStyles.buttonText}>Redo workout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    borderRadius: 32,
    backgroundColor: Colors.light.underlayOrange,
    padding: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: "#4b5462",
  },
  workoutTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workoutName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  workoutDate: {
    fontSize: 14,
    backgroundColor: Colors.light.underlayOrange,
    color: "#333333",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
