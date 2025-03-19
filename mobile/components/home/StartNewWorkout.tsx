import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  recommendText: string;
}

export default function StartNewWorkout({ recommendText }: Props) {
  const handleStartPress = () => {
    console.log("Start workout pressed");
  };

  const handleCustomizePress = () => {
    console.log("Customize workout pressed");
  };

  return (
    <>
      <Text style={styles.title}>Start a new workout</Text>
      <View style={styles.contentContainer}>
        <Text>{recommendText}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCustomizePress}
          >
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleStartPress}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
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
