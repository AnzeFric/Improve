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
import { Exercise } from "@/interfaces/workout";
import ModalOptions from "@/components/global/modals/ModalBottomAction";
import ModalAddSet from "@/components/workout/ModalAddSet";
import EditButton from "@/components/global/buttons/EditButton";
import CircleCheckButton from "@/components/global/buttons/CircleCheckButton";
import { useWorkout } from "@/hooks/useWorkout";
import { AppStyles } from "@/constants/AppStyles";

export default function NewWorkoutScreen() {
  const { workoutTitle } = useLocalSearchParams();
  const { handleFinishWorkout } = useWorkout();
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseIndex, setExerciseIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  const [modalOptions, setModalOptions] = useState(false);
  const [modalAddSet, setModalAddSet] = useState(false);

  const [emptyInputError, setEmptyInputError] = useState(false);

  const [exercises, setExercises] = useState<Array<Exercise>>([]);

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
      const newExercise: Exercise = {
        name: exerciseTitle,
        numSets: 0,
        sets: [],
      };
      setExercises([...exercises, newExercise]);
      setExerciseTitle("");
      setEmptyInputError(false);
    }
  };

  const editExercise = () => {
    setIsEditing(true);
    setModalOptions(false);
  };

  const deleteExercise = () => {
    exercises.splice(exerciseIndex, 1);
    setModalOptions(false);
  };

  const isEmpty = (): boolean => {
    if (!exerciseTitle && emptyInputError) {
      return true;
    }
    return false;
  };

  const finishWorkout = () => {
    const name = String(workoutTitle);
    const date = new Date();

    handleFinishWorkout(name, date, exercises).then((response) => {
      if (response) {
        router.back();
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TitleRow
          title={String(workoutTitle)}
          hasBackButton={true}
          menuButton={
            <CircleCheckButton color={"#fff"} onPress={finishWorkout} />
          }
        />
        <View style={styles.contentContainer}>
          {exercises.map((exercise, index) => (
            <View style={styles.itemContainer} key={index}>
              <ExerciseDisplay
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                isEditing={isEditing && index === exerciseIndex} // Additional condition ensures only the selected exercise can be edited
                setIsEditing={setIsEditing}
                editButton={
                  <EditButton
                    color={Colors.light.specialBlue}
                    onPress={() => openModalOptions(index)}
                  />
                }
                setExercises={setExercises}
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
                  AppStyles.inputContainer,
                  isEmpty() && {
                    borderColor: Colors.light.destructiveRed,
                    borderWidth: 1,
                  },
                ]}
              >
                <TextInput
                  style={AppStyles.input}
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

      <ModalOptions
        subject={"Exercise"}
        isVisible={modalOptions}
        setIsVisible={setModalOptions}
        handleEdit={editExercise}
        handleDelete={deleteExercise}
      />

      <ModalAddSet
        isVisible={modalAddSet}
        setIsVisible={setModalAddSet}
        exerciseIndex={exerciseIndex}
        exercises={exercises}
        setExercises={setExercises}
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
