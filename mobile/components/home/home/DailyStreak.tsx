import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  numStreak: number;
}

export default function DailyStreak({ numStreak }: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={"flame-sharp"} size={24} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Current streak</Text>
          {numStreak === 0 ? (
            <Text style={styles.title}>Loading streak...</Text>
          ) : (
            <Text style={styles.title}>{numStreak} Days</Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconContainer: {
    borderRadius: 32,
    backgroundColor: Colors.light.underlayOrange,
    padding: 12,
  },
  contentContainer: {
    display: "flex",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  text: {
    fontSize: 20,
    color: "#4b5462",
  },
});
