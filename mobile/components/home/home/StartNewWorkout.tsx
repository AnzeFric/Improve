import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppStyles } from "@/constants/AppStyles";

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
          style={AppStyles.borderButton}
          onPress={handleCustomize}
        >
          <Text style={AppStyles.borderButtonText}>Customize</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[AppStyles.button, { flex: 1 }]}
          onPress={handleStart}
        >
          <Text style={AppStyles.buttonText}>Start</Text>
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
});
