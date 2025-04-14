import { Text, View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { AppStyles } from "@/constants/AppStyles";
import { useState, useMemo } from "react";
import { modalSteps } from "@/interfaces/workout";
import CustomSplitSelection from "./CustomSplitSelection";
import PresetSplitSelection from "./PresetSplitSelection";
import IntensitySelection from "./IntensitySelection";
import splits from "@/data/splits.json";

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onSelectSplit: (
    name: string,
    intensity: string,
    customTrainingDays?: Array<string>
  ) => void;
}

export default function ModalSetSplit({
  isVisible,
  setIsVisible,
  onSelectSplit,
}: Props) {
  const splitData = useMemo(() => {
    return splits.items;
  }, [splits]);

  const [selectedSplit, setSelectedSplit] = useState<string | null>(
    splitData[0].name
  );
  const [customSplitName, setCustomSplitName] = useState("");
  const [customSplitDays, setCustomSplitDays] = useState<string[]>([]);
  const [showEmptyNameError, setShowEmptyNameError] = useState(false);
  const [showEmptyDaysError, setShowEmptyDaysError] = useState(false);
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(
    "Intermediate"
  );
  const [currentStep, setCurrentStep] = useState<modalSteps>("split");

  const handleConfirm = () => {
    if (selectedSplit === "Custom") {
      onSelectSplit(
        "Custom",
        selectedIntensity || "Intermediate",
        customSplitDays
      );
    } else if (selectedSplit && selectedIntensity) {
      onSelectSplit(selectedSplit, selectedIntensity);
    }
    handleCancel();
  };

  const handleNext = () => {
    if (currentStep === "split") {
      if (selectedSplit === "Custom") {
        setCurrentStep("custom");
      } else {
        setCurrentStep("intensity");
      }
    } else if (currentStep === "custom") {
      // Validate custom split
      if (customSplitName === "") {
        setShowEmptyNameError(true);
        return;
      } else if (customSplitDays.length <= 0) {
        setShowEmptyDaysError(true);
        return;
      }

      // Check if all days have names
      for (let i = 0; i < customSplitDays.length; i++) {
        const day = customSplitDays[i];
        if (day === "") {
          setShowEmptyDaysError(true);
          return;
        }
      }

      handleConfirm();
    } else if (currentStep === "intensity") {
      handleConfirm();
    }
  };

  const handleBack = () => {
    if (currentStep === "custom") {
      setCurrentStep("split");
    } else if (currentStep === "intensity") {
      if (selectedSplit === "Custom") {
        setCurrentStep("custom");
      } else {
        setCurrentStep("split");
      }
    }
  };

  const handleCancel = () => {
    setSelectedSplit(splitData[0].name);
    setCustomSplitName("");
    setCustomSplitDays([""]);
    setShowEmptyNameError(false);
    setShowEmptyDaysError(false);
    setSelectedIntensity("Intermediate");
    setCurrentStep("split");
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} transparent animationType={"fade"}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {currentStep === "split" && (
            <PresetSplitSelection
              presetSplits={splitData}
              selectedSplit={selectedSplit}
              setSelectedSplit={setSelectedSplit}
            />
          )}

          {currentStep === "custom" && (
            <CustomSplitSelection
              customSplitName={customSplitName}
              customSplitDays={customSplitDays}
              showEmptyNameError={showEmptyNameError}
              showEmptyDaysError={showEmptyDaysError}
              setCustomSplitName={setCustomSplitName}
              setCustomSplitDays={setCustomSplitDays}
              setShowEmptyNameError={setShowEmptyNameError}
              setShowEmptyDaysError={setShowEmptyDaysError}
            />
          )}

          {currentStep === "intensity" && (
            <IntensitySelection
              selectedIntensity={selectedIntensity}
              setSelectedIntensity={setSelectedIntensity}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[AppStyles.button, { backgroundColor: "#f0f0f0" }]}
              onPress={currentStep === "split" ? handleCancel : handleBack}
            >
              <Text style={[AppStyles.buttonText, { color: "#666" }]}>
                {currentStep === "split" ? "Cancel" : "Back"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={AppStyles.button} onPress={handleNext}>
              <Text style={AppStyles.buttonText}>
                {currentStep === "intensity" ? "Confirm" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 15,
    width: "90%",
    maxHeight: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
