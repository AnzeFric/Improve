import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import { Exercise, Workout } from "@/interfaces/workout";
import { Colors } from "@/constants/Colors";

interface Props {
  exercise: Exercise;
  exerciseIndex?: number;
  editButton?: React.ReactNode;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
  setWorkout?: Dispatch<SetStateAction<Workout>>;
}

export default function ExerciseDisplay({
  exercise,
  exerciseIndex,
  editButton,
  isEditing,
  setIsEditing,
  setWorkout,
}: Props) {
  const [updatedSets, setUpdatedSets] = useState(exercise.sets);

  const updateSet = (text: string, index: number, key: "rep" | "weight") => {
    if (!setWorkout || exerciseIndex === undefined) {
      return;
    }

    const newSets = updatedSets.map((set, setIndex) =>
      setIndex === index
        ? { ...set, [key]: text === "" ? 0 : Number(text) }
        : set
    );

    setUpdatedSets(newSets);

    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.exercises];
      updatedExercises[exerciseIndex] = {
        ...updatedExercises[exerciseIndex],
        sets: newSets,
      };
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{exercise.name}</Text>
        {editButton && <View>{editButton}</View>}
      </View>
      {updatedSets.map((set, index) => (
        <View style={styles.setRow} key={index}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={String(set.rep)}
                keyboardType="numeric"
                onChangeText={(text) => {
                  updateSet(text, index, "rep");
                }}
              />
              <TextInput
                style={styles.input}
                value={String(set.weight)}
                keyboardType="numeric"
                onChangeText={(text) => {
                  updateSet(text, index, "weight");
                }}
              />
            </>
          ) : (
            <>
              <Text style={styles.text}>{set.rep} reps</Text>
              <Text style={styles.weight}>{set.weight} kg</Text>
            </>
          )}
        </View>
      ))}
      {isEditing && setIsEditing ? (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            setIsEditing(false);
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    width: 60,
  },
  saveButton: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  weight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});
