import useSplitStore from "@/stores/useSplitStore";

export function useSplit() {
  const {
    splitName,
    splitIntensity,
    splitTrainingDays,
    setSplitName,
    setSplitIntensity,
    setSplitTraingingDays,
  } = useSplitStore();

  const saveSplit = async () => {
    console.log("Save split");
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
  };
}
