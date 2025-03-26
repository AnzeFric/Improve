import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";

export default function WorkoutScreen() {
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);

  const isEmpty = (): boolean => {
    if (!workoutTitle && emptyInputError) {
      return true;
    }
    return false;
  };

  const handlePress = () => {
    if (workoutTitle.length <= 0) {
      setEmptyInputError(true);
    } else {
      router.push({
        pathname: "/(tabs)/workout/new-workout",
        params: { workoutTitle: workoutTitle },
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setWorkoutTitle("");
        setEmptyInputError(false);
      };
    }, [])
  );

  return (
    <View>
      <TitleRow title={"Workout"} hasBackButton={false} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
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
              placeholder={"Workout title"}
              value={workoutTitle}
              onChangeText={setWorkoutTitle}
            />
          </View>
          {emptyInputError && !workoutTitle && (
            <Text style={styles.errorText}>Workout title is empty!</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Start new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 20,
  },
  contentContainer: {
    gap: 10,
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
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: Colors.light.destructiveRed,
  },
});
