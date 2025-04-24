import { useMemo } from "react";
import splits from "@/data/splits.json";
import useSplitStore from "@/stores/useSplitStore";

export function useSplit() {
  const {
    splitName,
    splitIntensity,
    splitTrainingDays,
    currentDayIndex,
    setSplitName,
    setSplitIntensity,
    setSplitTraingingDays,
    setCurrentDayIndex,
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
    return splitTrainingDays[currentDayIndex];
  };

  const setNextTraniningDay = () => {
    if (currentDayIndex >= splitTrainingDays.length) {
      setCurrentDayIndex(0);
    } else {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const getSplit = async () => {
    console.log("Fetch split");
  };

  const changeSplit = async () => {
    console.log("Change split");
  };

  return {
    splitName,
    splitIntensity,
    splitTrainingDays,
    setSplitName,
    setSplitIntensity,
    setSplitTraingingDays,
    saveSplit,
    getSplit,
    changeSplit,
    getCurrentTrainingDay,
    setNextTraniningDay,
  };
}
