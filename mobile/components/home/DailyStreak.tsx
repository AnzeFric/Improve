import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  numStreak: number;
}

export default function DailyStreak({ numStreak }: Props) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Day streak</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{numStreak}</Text>
          <Ionicons name={"flame"} color={"orange"} size={24} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
