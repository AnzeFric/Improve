import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Timeline } from "@/interfaces/statistics";

interface Props {
  text: Timeline;
  timeline: Timeline;
  setTimeline: (timeline: Timeline) => void;
}

export default function ButtonSelectable({
  text,
  timeline,
  setTimeline,
}: Props) {
  return (
    <TouchableOpacity
      style={timeline === text ? styles.button : styles.inactiveButton}
      onPress={() => setTimeline(text)}
    >
      <Text
        style={
          timeline === text ? styles.buttonText : styles.inactiveButtonText
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.light.specialBlue,
  },
  inactiveButton: {
    backgroundColor: "#fff",
    borderColor: Colors.light.specialBlue,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inactiveButtonText: {
    color: Colors.light.specialBlue,
    fontSize: 16,
    fontWeight: "bold",
  },
});
