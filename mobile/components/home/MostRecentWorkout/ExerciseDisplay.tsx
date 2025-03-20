import { Text, View, StyleSheet } from "react-native";
import { Exercise } from "@/interfaces/workout";

interface Props {
  exercise: Exercise;
}

export default function ExerciseDisplay({ exercise }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      {exercise.sets.map((set, index) => (
        <View style={styles.setRow} key={index}>
          <Text style={styles.text}>{set.rep} reps</Text>
          <Text style={styles.weight}>{set.weight} kg</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  weight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});
