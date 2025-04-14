import { Colors } from "@/constants/Colors";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

interface Props {
  customSplitName: string;
  customSplitDays: Array<string>;
  showEmptyNameError: boolean;
  showEmptyDaysError: boolean;
  setCustomSplitName: (customSplitName: string) => void;
  setCustomSplitDays: (customSplitDays: Array<string>) => void;
  setShowEmptyNameError: (showEmptyNameError: boolean) => void;
  setShowEmptyDaysError: (showEmptyDaysError: boolean) => void;
}

export default function CustomSplitSelection({
  customSplitName,
  customSplitDays,
  showEmptyNameError,
  showEmptyDaysError,
  setCustomSplitName,
  setCustomSplitDays,
  setShowEmptyNameError,
  setShowEmptyDaysError,
}: Props) {
  const addCustomDay = () => {
    setCustomSplitDays([...customSplitDays, ""]);
  };

  const updateCustomDay = (text: string, index: number) => {
    const updatedDays = [...customSplitDays];
    updatedDays[index] = text;
    setCustomSplitDays(updatedDays);
    setShowEmptyDaysError(false);
  };

  const removeCustomDay = (index: number) => {
    if (customSplitDays.length > 0) {
      const updatedDays = customSplitDays.filter((_, i) => i !== index);
      setCustomSplitDays(updatedDays);
    }
  };

  const splitNameChange = (text: string) => {
    setCustomSplitName(text);
    setShowEmptyNameError(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>Create Custom Split</Text>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <TextInput
          style={styles.customNameInput}
          placeholder="Name your split"
          value={customSplitName}
          onChangeText={(text) => splitNameChange(text)}
        />
        {showEmptyNameError && !customSplitName && (
          <Text style={styles.errorText}>
            Error: Split name can not be empty!
          </Text>
        )}

        <Text style={styles.sectionSubtitle}>Training Days</Text>
        {customSplitDays.map((day: string, index: number) => (
          <View key={index} style={styles.dayInputRow}>
            <TextInput
              style={styles.dayInput}
              placeholder={`Day ${index + 1} (e.g., Chest or Back)`}
              value={day}
              onChangeText={(text) => updateCustomDay(text, index)}
              autoComplete={"off"}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeCustomDay(index)}
            >
              <Text style={styles.removeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        ))}

        {showEmptyDaysError && (
          <Text style={styles.errorText}>
            Error: You need at least one day, with filled names!
          </Text>
        )}

        <TouchableOpacity style={styles.addDayButton} onPress={addCustomDay}>
          <Text style={styles.addDayButtonText}>+ Add Training Day</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  customNameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  dayInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    width: 30,
    height: 30,
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 15,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  addDayButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  addDayButtonText: {
    color: "#0284c7",
    fontWeight: "600",
  },
  errorText: {
    color: Colors.light.destructiveRed,
    fontWeight: "bold",
  },
});
