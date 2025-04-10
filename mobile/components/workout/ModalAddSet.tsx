import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Exercise } from "@/interfaces/workout";
import { AppStyles } from "@/constants/AppStyles";

interface Props {
  exerciseIndex: number;
  exercises: Array<Exercise>;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setExercises: (exercises: Array<Exercise>) => void;
}

export default function ModalAddSet({
  exerciseIndex,
  exercises,
  isVisible,
  setIsVisible,
  setExercises,
}: Props) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const [emptyRepsError, setEmptyRepsError] = useState(false);
  const [emptyWeightError, setEmptyWeightError] = useState(false);

  const clearInputsAndClose = () => {
    setReps("");
    setWeight("");
    setEmptyRepsError(false);
    setEmptyWeightError(false);
    setIsVisible(false);
  };

  // Clear inputs and errors when modal is closed
  useFocusEffect(
    useCallback(() => {
      return () => {
        clearInputsAndClose();
      };
    }, [])
  );

  const handleAdd = () => {
    if (reps.length <= 0) {
      setEmptyRepsError(true);
      return;
    }

    if (weight.length <= 0) {
      setEmptyWeightError(true);
      return;
    }

    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({
      reps: Number(reps),
      weight: Number(weight),
    });
    updatedExercises[exerciseIndex].numSets++;

    setExercises(updatedExercises);
    clearInputsAndClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType={"fade"}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add set</Text>
          <View style={styles.contentContainer}>
            <View
              style={[
                AppStyles.inputContainer,
                emptyRepsError && !reps && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={AppStyles.input}
                placeholder="Reps"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
              />
            </View>
            {emptyRepsError && !reps && (
              <Text style={styles.errorText}>Reps are required</Text>
            )}

            <View
              style={[
                AppStyles.inputContainer,
                emptyWeightError && !weight && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={AppStyles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            {emptyWeightError && !weight && (
              <Text style={styles.errorText}>Weight is required</Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={clearInputsAndClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    gap: 10,
  },
  inputContainerError: {
    borderColor: Colors.light.destructiveRed,
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: -5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 10,
  },
  addButton: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
