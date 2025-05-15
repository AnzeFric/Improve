import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import TitleRow from "@/components/global/TitleRow";
import StartNewWorkout from "@/components/home/home/StartNewWorkout";
import DailyStreak from "@/components/home/home/DailyStreak";
import MostRecentWorkout from "@/components/home/home/MostRecentWorkout/MostRecentWorkout";
import ModalSetSplit from "@/components/home/home/ModalSetSplit/ModalSetSplit";
import MenuButton from "@/components/global/buttons/MenuButton";
import { useUser } from "@/hooks/useUser";
import { useStatistic } from "@/hooks/useStatistic";
import { useWorkout } from "@/hooks/useWorkout";
import { useStreak } from "@/hooks/useStreak";
import { useAuth } from "@/hooks/useAuth";
import { useSplit } from "@/hooks/useSplit";

export default function HomeScreen() {
  const { firstName, firstLogin, getUser, setFirstLogin } = useUser();
  const { getWorkoutExerciseOptions } = useStatistic();
  const { lastestWorkout, getLatestWorkout } = useWorkout();
  const { getStreakData, getDays, updateDayStreak } = useStreak();
  const { handleLogout } = useAuth();
  const { checkForNextTrainingDay, saveSplit, getCurrentTrainingDay } =
    useSplit();

  const [dayStreak, setDayStreak] = useState(0);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (!firstName) return;

        const user = await getUser();
        if (!user) return;

        const promises = Promise.allSettled([
          checkForNextTrainingDay(),
          getLatestWorkout(),
          getWorkoutExerciseOptions(),
        ]);

        await getStreakData().then(() => updateDayStreak());

        const days = getDays();
        setDayStreak(days);

        await promises;
      } catch (error) {
        console.error("Error initializing user data:", error);
        Alert.alert(
          "Error",
          "An error occured while loading data. Please login again"
        );
        handleLogout();
      }
    };

    initializeUser();
  }, [firstName]);

  const handleSelectSplit = (
    name: string,
    intensity: string,
    customTrainingDays: Array<string> | undefined
  ) => {
    setFirstLogin(false);

    if (customTrainingDays) {
      saveSplit(name, intensity, customTrainingDays);
    } else {
      saveSplit(name, intensity);
    }
  };

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
            <MostRecentWorkout workout={lastestWorkout} />
          </View>
          <View style={styles.itemContainer}>
            <StartNewWorkout recommendWorkout={getCurrentTrainingDay()} />
          </View>
          <View style={styles.itemContainer}>
            <DailyStreak numStreak={dayStreak} />
          </View>
        </View>
      </ScrollView>
      <ModalSetSplit
        isVisible={firstLogin}
        setIsVisible={() => setFirstLogin(false)}
        onSelectSplit={handleSelectSplit}
      />
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
