import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function WorkoutScreen() {
  const handlePress = () => {
    router.push("/(tabs)/workout/new-workout");
  };

  return (
    <View>
      <TitleRow title={"Workout"} hasBackButton={false} />
      <View style={styles.container}>
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
