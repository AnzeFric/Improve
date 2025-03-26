import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function WorkoutScreen() {
  const [workoutTitle, setWorkoutTitle] = useState("");

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/workout/new-workout",
      params: { workoutTitle: "Pull day" },
    });
  };

  return (
    <View>
      <TitleRow title={"Workout"} hasBackButton={false} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Workout title"}
            value={workoutTitle}
            onChangeText={setWorkoutTitle}
          />
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    justifyContent: "space-between",
    paddingRight: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
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
});
