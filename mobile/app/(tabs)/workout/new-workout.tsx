import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TitleRow from "@/components/global/TitleRow";
import ExerciseDisplay from "@/components/home/home/MostRecentWorkout/ExerciseDisplay";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Workout } from "@/interfaces/workout";
import ModalOptions from "@/components/global/modals/ModalBottomAction";
import ModalAddSet from "@/components/workout/ModalAddSet";

export default function NewWorkoutScreen() {
  const { workoutTitle } = useLocalSearchParams();
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseIndex, setExerciseIndex] = useState(-1);

  const [modalOptions, setModalOptions] = useState(false);
  const [modalAddSet, setModalAddSet] = useState(false);

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [workout, setWorkout] = useState<Workout>({
    name: String(workoutTitle),
    date: new Date(),
    exercises: [],
  });

  const openModalAddSet = (exerciseIndex: number) => {
    setExerciseIndex(exerciseIndex);
    setModalAddSet(true);
  };

  const openModalOptions = (exerciseIndex: number) => {
    setExerciseIndex(exerciseIndex);
    setModalOptions(true);
  };

  const addExercise = () => {
    if (exerciseTitle.length <= 0) {
      setEmptyInputError(true);
    } else {
      setWorkout({
        ...workout,
        exercises: [
          ...workout.exercises,
          { name: exerciseTitle, numSets: 0, sets: [] },
        ],
      });
      setExerciseTitle("");
      setEmptyInputError(false);
    }
  };

  const deleteExercise = () => {
    workout.exercises.splice(exerciseIndex, 1);
    setModalOptions(false);
  };

  const finishWorkout = () => {
    // TODO: Send api req to save workout
    router.back();
  };

  const isEmpty = (): boolean => {
    if (!exerciseTitle && emptyInputError) {
      return true;
    }
    return false;
  };

  const editButton = (index: number) => (
    <TouchableOpacity onPress={() => openModalOptions(index)}>
      <Ionicons
        name="create-outline"
        size={22}
        color={Colors.light.specialBlue}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TitleRow title={workout.name} hasBackButton={true} />
        <View style={styles.contentContainer}>
          {workout.exercises.map((exercise, index) => (
            <View style={styles.itemContainer} key={index}>
              <ExerciseDisplay
                exercise={exercise}
                editButton={editButton(index)}
              />
              <TouchableOpacity
                style={styles.buttonRep}
                onPress={() => openModalAddSet(index)}
              >
                <Text style={styles.buttonTextRep}>Add Set</Text>
                <Ionicons
                  name="add"
                  size={22}
                  color={Colors.light.specialBlue}
                />
              </TouchableOpacity>
            </View>
          ))}

          <View>
            <View style={styles.exerciseAddContainer}>
              <View
                style={[
                  styles.inputContainer,
                  isEmpty() && {
                    shadowColor: Colors.light.destructiveRed,
                    elevation: 5,
                  },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder={"Exercise title"}
                  value={exerciseTitle}
                  onChangeText={setExerciseTitle}
                />
              </View>
              {isEmpty() && (
                <Text style={styles.errorText}>Exercise title is empty!</Text>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={addExercise}>
              <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonFinish} onPress={finishWorkout}>
        <Text style={styles.buttonText}>Finish Workout</Text>
      </TouchableOpacity>

      <ModalOptions
        subject={"Exercise"}
        isVisible={modalOptions}
        setIsVisible={setModalOptions}
        handleEdit={() => {}}
        handleDelete={deleteExercise}
      />

      <ModalAddSet
        isVisible={modalAddSet}
        setIsVisible={setModalAddSet}
        exerciseIndex={exerciseIndex}
        workout={workout}
        setWorkout={setWorkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 15,
  },
  itemContainer: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonRep: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderTopColor: "#ddd",
  },
  buttonTextRep: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.specialBlue,
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonFinish: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  exerciseAddContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.destructiveRed,
  },
});
