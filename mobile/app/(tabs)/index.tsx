import { Text, View, StyleSheet, ScrollView } from "react-native";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import StartNewWorkout from "@/components/home/StartNewWorkout";

export default function HomeScreen() {
  return (
    <View>
      <TitleRow title={"Home"} hasBackButton={false} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.itemContainer}>
            <StartNewWorkout recommendText={"We recommend push day!"} />
          </View>
          <Text>Day streak</Text>
          <Text>Most recent workout</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  itemContainer: {
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
