import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

type timeline = "Day" | "Week" | "Month" | "Year";

interface Props {
  text: timeline;
  timeline: timeline;
  setTimeline: (timeline: timeline) => void;
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
