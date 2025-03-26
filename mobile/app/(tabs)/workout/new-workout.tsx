import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ExerciseDisplay from "@/components/home/MostRecentWorkout/ExerciseDisplay";

export default function NewWorkoutScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [workout, setWorkout] = useState({
    name: "Pull Day",
    exercises: [
      {
        name: "Biceps Curl",
        numSets: 2,
        sets: [
          { rep: 8, weight: 12 },
          { rep: 6, weight: 14 },
        ],
      },
      {
        name: "Lat Pulldown",
        numSets: 2,
        sets: [
          { rep: 10, weight: 40 },
          { rep: 8, weight: 50 },
        ],
      },
    ],
  });

  const addSet = (exerciseIndex: any) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIndex].sets.push({ rep: 8, weight: 10 });
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const addExercise = () => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        { name: "New Exercise", numSets: 0, sets: [] },
      ],
    });
  };

  const finishWorkout = () => {
    Alert.alert("Workout Completed", "Great job finishing your workout!");
  };

  const editButton = (
    <TouchableOpacity onPress={() => setIsVisible(true)}>
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
              <ExerciseDisplay exercise={exercise} editButton={editButton} />
              <TouchableOpacity
                style={styles.buttonRep}
                onPress={() => addSet(index)}
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

          <TouchableOpacity style={styles.button} onPress={addExercise}>
            <Text style={styles.buttonText}>Add Exercise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buttonFinish} onPress={finishWorkout}>
        <Text style={styles.buttonText}>Finish Workout</Text>
      </TouchableOpacity>
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
});
