import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  prompt: string;
}

export default function AiItem({ prompt }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{prompt}</Text>
      <View style={styles.iconContainer}>
        <Ionicons
          name="school-outline"
          size={36}
          color={Colors.light.specialBlue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 15,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  iconContainer: {
    alignSelf: "flex-start",
  },
});
