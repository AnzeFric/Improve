import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect } from "react";
import TitleRow from "@/components/global/TitleRow";
import StartNewWorkout from "@/components/home/home/StartNewWorkout";
import DailyStreak from "@/components/home/home/DailyStreak";
import MostRecentWorkout from "@/components/home/home/MostRecentWorkout/MostRecentWorkout";
import MenuButton from "@/components/global/buttons/MenuButton";
import { useUser } from "@/hooks/useUser";

export default function HomeScreen() {
  const { dayStreak, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View>
      <ScrollView>
        <TitleRow
          title={"Home"}
          hasBackButton={false}
          menuButton={<MenuButton path={"/(tabs)/home/settings"} />}
        />
        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <MostRecentWorkout />
          </View>
          <View style={styles.itemContainer}>
            <StartNewWorkout recommendWorkout={"Push day"} />
          </View>
          <View style={styles.itemContainer}>
            <DailyStreak numStreak={dayStreak} />
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
