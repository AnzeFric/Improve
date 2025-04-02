import { ScrollView, StyleSheet } from "react-native";
import ButtonSelectable from "./ButtonSelectable";
import { Timeline } from "@/interfaces/statistics";

interface Props {
  timeline: Timeline;
  setTimeline: (timeline: Timeline) => void;
}

export default function DaySelector({ timeline, setTimeline }: Props) {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.buttonContainer}
      showsHorizontalScrollIndicator={false}
    >
      <ButtonSelectable
        text={"Day"}
        timeline={timeline}
        setTimeline={setTimeline}
      />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 10,
  },
});
