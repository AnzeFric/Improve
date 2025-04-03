import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonSelectable from "./ButtonSelectable";
import { Timeline } from "@/interfaces/statistics";

interface Props {
  timeline: Timeline;
  setTimeline: (timeline: Timeline) => void;
}

export default function DaySelector({ timeline, setTimeline }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <ButtonSelectable
        text={"Week"}
        timeline={timeline}
        setTimeline={setTimeline}
      />
      <ButtonSelectable
        text={"Month"}
        timeline={timeline}
        setTimeline={setTimeline}
      />
      <ButtonSelectable
        text={"Year"}
        timeline={timeline}
        setTimeline={setTimeline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});
