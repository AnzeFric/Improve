import { View, StyleSheet, ScrollView } from "react-native";
import TitleRow from "@/components/TitleRow";
import StartNewWorkout from "@/components/home/StartNewWorkout";
import DailyStreak from "@/components/home/DailyStreak";
import MostRecentWorkout from "@/components/home/MostRecentWorkout/MostRecentWorkout";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeScreen() {
  const menu = (
    <Ionicons
      name={"settings-sharp"}
      size={30}
      color={"#FFFFFF"}
      onPress={() => {
        router.push("/(tabs)/settings");
      }}
    />
  );

  return (
    <View>
      <ScrollView>
        <TitleRow title={"Home"} hasBackButton={false} menuButton={menu} />
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <MostRecentWorkout />
          </View>
          <View style={styles.itemContainer}>
            <StartNewWorkout recommendWorkout={"Push day"} />
          </View>
          <View style={styles.itemContainer}>
            <DailyStreak numStreak={5} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
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
