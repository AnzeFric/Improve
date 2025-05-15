import { View, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import TitleRow from "@/components/global/TitleRow";
import StartNewWorkout from "@/components/home/home/StartNewWorkout";
import DailyStreak from "@/components/home/home/DailyStreak";
import MostRecentWorkout from "@/components/home/home/MostRecentWorkout/MostRecentWorkout";
import MenuButton from "@/components/global/buttons/MenuButton";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useSplit } from "@/hooks/useSplit";
import { useStreak } from "@/hooks/useStreak";
import { useWorkout } from "@/hooks/useWorkout";
import ModalSetSplit from "@/components/home/home/ModalSetSplit/ModalSetSplit";
import { useStatistic } from "@/hooks/useStatistic";

export default function HomeScreen() {
  const { firstName, getUser } = useUser();
  const { isFirstLogin, setIsFirstLogin } = useAuth();
  const { getStreakData, getDays, updateDayStreak } = useStreak();
  const [dayStreak, setDayStreak] = useState(0);
  const { lastestWorkout, getLatestWorkout } = useWorkout();
  const { checkForNextTrainingDay, saveSplit, getCurrentTrainingDay } =
    useSplit();
  const { workoutOptions, getWorkoutExerciseOptions } = useStatistic();

  useEffect(() => {
    const checkForWorkout = async () => {
      if (!lastestWorkout) {
        await getLatestWorkout();
      }
    };

    const updateAndSaveStreak = async () => {
      await getStreakData();
      await updateDayStreak().then(() => {
        let days = getDays();
        setDayStreak(days);
      });
    };

    const fetchUser = async () => {
      const response = await getUser();
      if (response) {
        updateAndSaveStreak();

        if (workoutOptions.length <= 0) {
          getWorkoutExerciseOptions();
        }
      }
    };

    fetchUser();
    checkForNextTrainingDay();
    checkForWorkout();
  }, [firstName]); // Firstname cannot be changed by user. New firstname === new user

  const handleSelectSplit = (
    name: string,
    intensity: string,
    customTrainingDays: Array<string> | undefined
  ) => {
    setIsFirstLogin(false);

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
        isVisible={isFirstLogin}
        setIsVisible={() => setIsFirstLogin(false)}
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
