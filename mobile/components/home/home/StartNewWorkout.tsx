import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Props {
  recommendWorkout: string;
}

export default function StartNewWorkout({ recommendWorkout }: Props) {
  const handleStart = () => {
    router.push({
      pathname: "/(tabs)/workout/new-workout",
      params: { workoutTitle: recommendWorkout },
    });
  };

  const handleCustomize = () => {
    router.push("/(tabs)/workout");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Ionicons style={styles.icon} name={"cellular"} size={24} />

        <View>
          <Text style={styles.title}>Start a new workout</Text>
          <Text style={styles.text}>{recommendWorkout}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonCustomize}
          onPress={handleCustomize}
        >
          <Text
            style={[styles.buttonText, { color: Colors.light.specialBlue }]}
          >
            Customize
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStart} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    borderRadius: 32,
    backgroundColor: Colors.light.underlayOrange,
    padding: 12,
  },
  title: {
    fontSize: 20,
    color: "#4b5462",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingTop: 20,
  },
  buttonStart: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 8,
    paddingVertical: 8,
    flex: 1,
  },
  buttonCustomize: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.specialBlue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.light.specialBlue,
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
