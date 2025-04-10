import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import TitleRow from "@/components/global/TitleRow";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import { AppStyles } from "@/constants/AppStyles";

export default function WorkoutScreen() {
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [emptyInputError, setEmptyInputError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setWorkoutTitle("");
      setEmptyInputError(false);
    }, [])
  );

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

  const isEmpty = () => !workoutTitle && emptyInputError;

  return (
    <View>
      <TitleRow title={"Workout"} hasBackButton={false} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
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
