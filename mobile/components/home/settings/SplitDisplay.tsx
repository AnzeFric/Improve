import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/AppStyles";
import ModalSetSplit from "../home/ModalSetSplit/ModalSetSplit";

interface Props {
  splitName: string;
  splitIntensity: string;
  splitTrainingDays: Array<string>;
  handleSelectSplit: (
    name: string,
    intensity: string,
    customTrainingDays: Array<string> | undefined
  ) => void;
}

export default function SplitDisplay({
  splitName,
  splitIntensity,
  splitTrainingDays,
  handleSelectSplit,
}: Props) {
  const [showSplitModal, setShowSplitModal] = useState(false);

  return (
    <View>
      <Text style={styles.sectionTitle}>Training Split</Text>

      <View style={styles.splitContainer}>
        <View style={styles.splitHeader}>
          <View>
            <Text style={styles.labelText}>
              Name: <Text style={styles.valueText}>{splitName}</Text>
            </Text>
            <Text style={styles.labelText}>
              Intensity: <Text style={styles.valueText}>{splitIntensity}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.daysContainer}>
          {splitTrainingDays.map((day, index) => (
            <View key={index}>
              <Text style={styles.dayText}>
                Day {index + 1}: {day}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={AppStyles.button}
          onPress={() => setShowSplitModal(true)}
        >
          <Text style={AppStyles.buttonText}>Change Split</Text>
        </TouchableOpacity>
      </View>

      <ModalSetSplit
        isVisible={showSplitModal}
        setIsVisible={setShowSplitModal}
        onSelectSplit={handleSelectSplit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  splitContainer: {
    paddingVertical: 8,
  },
  splitHeader: {
    paddingBottom: 16,
  },
  splitName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  labelText: {
    fontSize: 16,
    color: "#666",
  },
  valueText: {
    fontWeight: "600",
    color: "#444",
  },
  daysContainer: {
    paddingBottom: 16,
    gap: 10,
  },
  dayText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
});
