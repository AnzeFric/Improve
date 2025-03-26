import { View, StyleSheet } from "react-native";
import { Workout } from "@/interfaces/workout";
import ExerciseDisplay from "./ExerciseDisplay";

interface Props {
  workout: Workout;
}

export default function WorkoutDisplay({ workout }: Props) {
  return (
    <View style={styles.container}>
      {workout.exercises.map((exercise, index) => (
        <ExerciseDisplay exercise={exercise} key={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
