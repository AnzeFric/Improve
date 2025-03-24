import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Profile } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import ModalProfileDisplay from "./ModalProfileDisplay";
import { useBmiCalculator } from "@/hooks/useBmiCalculator";

interface Props {
  profile: Profile;
}

export default function ProfileDisplay({ profile }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const { getBmiCategory, getBmiColor, calculateBmi } = useBmiCalculator();

  const bmi = useMemo(() => {
    return calculateBmi(profile.weight, profile.height);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.editIconButton}
          onPress={() => setIsVisible(true)}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color={Colors.light.specialBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statContainer}>
        {/* When using conditional rendering it gives an error (&&) */}
        {profile.age ? (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.divider} />
          </>
        ) : (
          <></>
        )}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.height}</Text>
          <Text style={styles.statLabel}>cm</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{profile.weight}</Text>
          <Text style={styles.statLabel}>kg</Text>
        </View>
      </View>

      <View style={styles.bmiContainer}>
        <Text style={styles.bmiText}>
          {bmi} kg/m² (
          <Text style={{ color: getBmiColor(bmi) }}>{getBmiCategory(bmi)}</Text>
          )
        </Text>
        <Text style={styles.bmiNote}>
          Note: BMI is not always accurate, especially for people in the gym.
        </Text>
      </View>

      <ModalProfileDisplay isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  editIconButton: {
    padding: 6,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#ddd",
  },
  bmiContainer: {
    backgroundColor: "#f1f6ff",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bmiText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.specialBlue,
  },
  bmiNote: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});
