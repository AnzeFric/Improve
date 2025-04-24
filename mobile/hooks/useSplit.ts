import { useMemo } from "react";
import splits from "@/data/splits.json";
import useSplitStore from "@/stores/useSplitStore";

export function useSplit() {
  const {
    splitName,
    splitIntensity,
    splitTrainingDays,
    currentDayIndex,
    lastTrainingDayChange,
    setSplitName,
    setSplitIntensity,
    setSplitTraingingDays,
    setCurrentDayIndex,
    setLastTrainingDayChange,
  } = useSplitStore();

  const splitData = useMemo(() => {
    return splits.items;
  }, [splits]);

  const saveSplit = async (
    name: string,
    intensity: string,
    trainingDays?: Array<string>
  ) => {
    setSplitName(name);
    setCurrentDayIndex(0);

    if (trainingDays) {
      setSplitTraingingDays(trainingDays);
      setSplitIntensity("");
    } else {
      setSplitIntensity(intensity);

      const foundSplit = splitData.find((split) => split.name === name);
      if (foundSplit) {
        const foundIntensity = foundSplit.intensity.find(
          (item) => item.type === intensity
        );

        if (foundIntensity && foundIntensity.trainingDays) {
          setSplitTraingingDays(foundIntensity.trainingDays);
        }
      }
    }
  };

  const getCurrentTrainingDay = () => {
    return `Day ${currentDayIndex + 1}: ${splitTrainingDays[currentDayIndex]}`;
  };

  const setNextTraniningDay = () => {
    if (currentDayIndex >= splitTrainingDays.length - 1) {
      setCurrentDayIndex(0);
    } else {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const checkForNextTrainingDay = () => {
    const now = new Date();

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const lastTrainingDay = new Date(lastTrainingDayChange);
    lastTrainingDay.setHours(0, 0, 0, 0);

    if (today.getTime() != lastTrainingDay.getTime()) {
      setNextTraniningDay();
      setLastTrainingDayChange(now);
    }
  };

  return {
    splitName,
    splitIntensity,
    splitTrainingDays,
    setSplitName,
    setSplitIntensity,
    setSplitTraingingDays,
    saveSplit,
    getCurrentTrainingDay,
    checkForNextTrainingDay,
  };
}
