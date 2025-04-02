import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import ButtonSelectable from "@/components/statistics/ButtonSelectable";

type timeline = "Day" | "Week" | "Month" | "Year";

export default function StatisticsScreen() {
  const [timeline, setTimeline] = useState<timeline>("Day");

  return (
    <View>
      <TitleRow title={"Statistics"} hasBackButton={false} />
      <View style={styles.container}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  buttonContainer: {
    gap: 10,
  },
});
