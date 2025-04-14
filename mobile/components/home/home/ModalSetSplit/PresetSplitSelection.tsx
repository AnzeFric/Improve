import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SplitDescription } from "@/interfaces/workout";

interface Props {
  presetSplits: Array<SplitDescription>;
  selectedSplit: string | null;
  setSelectedSplit: (selectedSplit: string | null) => void;
}

export default function PresetSplitSelection({
  presetSplits,
  selectedSplit,
  setSelectedSplit,
}: Props) {
  return (
    <View>
      <Text style={styles.modalTitle}>Select Workout Split</Text>

      <ScrollView style={styles.splitOptionsContainer}>
        {presetSplits.map((split, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.splitOption,
              selectedSplit === split.name && styles.selectedSplit,
            ]}
            onPress={() => setSelectedSplit(split.name)}
          >
            <Text style={styles.splitName}>{split.name}</Text>
            <Text style={styles.splitDescription}>{split.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.splitOption,
            selectedSplit === "Custom" && styles.selectedSplit,
          ]}
          onPress={() => setSelectedSplit("Custom")}
        >
          <Text style={styles.splitName}>Custom Split</Text>
          <Text style={styles.splitDescription}>
            Create your own personalized workout split
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  splitOptionsContainer: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  splitOption: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
  },
  selectedSplit: {
    backgroundColor: "#e0f2fe",
    borderColor: "#0284c7",
  },
  splitName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  splitDescription: {
    fontSize: 14,
    color: "#666",
  },
});
