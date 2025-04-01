import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import { Exercise } from "@/interfaces/workout";
import { Colors } from "@/constants/Colors";

interface Props {
  exercise: Exercise;
  exerciseIndex?: number;
  isEditing?: boolean;
  editButton?: React.ReactNode;
  setIsEditing?: (isEditing: boolean) => void;
  setExercises?: Dispatch<SetStateAction<Exercise[]>>;
}

export default function ExerciseDisplay({
  exercise,
  exerciseIndex,
  isEditing,
  editButton,
  setIsEditing,
  setExercises,
}: Props) {
  const [updatedSets, setUpdatedSets] = useState(exercise.sets);

  const updateSet = (text: string, index: number, key: "reps" | "weight") => {
    if (!setExercises || exerciseIndex === undefined) {
      return;
    }

    const newSets = updatedSets.map((set, setIndex) =>
      setIndex === index
        ? { ...set, [key]: text === "" ? 0 : Number(text) }
        : set
    );

    setUpdatedSets(newSets);

    setExercises((prevExercises) => {
      let updatedExercises = [...prevExercises];
      updatedExercises[exerciseIndex].sets = newSets;

      return updatedExercises;
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
                value={String(set.reps)}
                keyboardType="numeric"
                onChangeText={(text) => {
                  updateSet(text, index, "reps");
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
              <Text style={styles.text}>{set.reps} reps</Text>
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
