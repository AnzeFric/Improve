import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Workout } from "@/interfaces/workout";
import WorkoutDisplay from "./WorkoutDisplay";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "@/constants/Utils";

interface Props {
  workout: Workout | null;
}

export default function MostRecentWorkout({ workout }: Props) {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Ionicons style={styles.icon} name={"barbell"} size={24} />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Most Recent Workout</Text>

          {workout ? (
            <View style={styles.workoutTitleContainer}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutDate}>
                {formatDate(new Date(workout.date))}
              </Text>
            </View>
          ) : (
            <Text style={styles.workoutName}>Empty...</Text>
          )}
        </View>
      </View>

      {workout && <WorkoutDisplay workout={workout} />}
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
    flexWrap: "wrap",
    gap: 10,
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
