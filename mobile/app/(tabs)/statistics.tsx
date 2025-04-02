import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import DaySelector from "@/components/statistics/DaySelector";
import { Timeline } from "@/interfaces/statistics";

export default function StatisticsScreen() {
  const [timeline, setTimeline] = useState<Timeline>("Day");

  return (
    <View>
      <TitleRow title={"Statistics"} hasBackButton={false} />
      <View style={styles.container}>
        <DaySelector timeline={timeline} setTimeline={setTimeline} />
        <View>
          <Text>
            Select specific exercises, workouts or overall with dropdown
          </Text>
          <Text>Progress graph</Text>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});
