import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function MostRecentWorkout() {
  return (
    <>
      <Text style={styles.title}>Most Recent Workout</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  contentContainer: {
    gap: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
