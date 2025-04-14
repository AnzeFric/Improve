import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Props {
  selectedIntensity: string | null;
  setSelectedIntensity: (intensity: string) => void;
}

const intensityOptions = [
  {
    name: "Beginner",
    description: "Lower volume, focus on form and building habits",
  },
  {
    name: "Intermediate",
    description: "Balanced volume and intensity for consistent progress",
  },
  {
    name: "Advanced",
    description: "Higher volume, intensity, and exercise variation",
  },
];

export default function IntensitySelection({
  selectedIntensity,
  setSelectedIntensity,
}: Props) {
  return (
    <View>
      <Text style={styles.modalTitle}>Select Workout Intensity</Text>

      <ScrollView style={styles.optionsContainer}>
        {intensityOptions.map((intensity, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedIntensity === intensity.name && styles.selectedOption,
            ]}
            onPress={() => setSelectedIntensity(intensity.name)}
          >
            <Text style={styles.optionName}>{intensity.name}</Text>
            <Text style={styles.optionDescription}>
              {intensity.description}
            </Text>
          </TouchableOpacity>
        ))}
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
  optionsContainer: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  option: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
  },
  selectedOption: {
    backgroundColor: "#e0f2fe",
    borderColor: "#0284c7",
  },
  optionName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
  },
});
