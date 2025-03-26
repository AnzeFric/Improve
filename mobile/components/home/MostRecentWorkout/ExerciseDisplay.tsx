import { Text, View, StyleSheet } from "react-native";
import { Exercise } from "@/interfaces/workout";

interface Props {
  exercise: Exercise;
  editButton?: React.ReactNode;
}

export default function ExerciseDisplay({ exercise, editButton }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
        {editButton && <View>{editButton}</View>}
      </View>
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
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
