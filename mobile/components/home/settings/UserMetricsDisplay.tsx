import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { UserMetrics } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import ModalBottomAction from "../../global/modals/ModalBottomAction";
import { useBmiCalculator } from "@/hooks/useBmiCalculator";
import { useUserMetrics } from "@/hooks/useUserMetrics";
import ModalUserMetricsUpdate from "./ModalUserMetricsCreate";

interface Props {
  userMetrics: UserMetrics;
}

export default function UserMetricsDisplay({ userMetrics }: Props) {
  const [showBottomActionModal, setShowBottomActionModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { getBmiCategory, getBmiColor, calculateBmi } = useBmiCalculator();
  const { deleteUserMetrics } = useUserMetrics();

  const bmi = useMemo(() => {
    return calculateBmi(userMetrics.weight, userMetrics.height);
  }, [userMetrics]);

  const handleUpdate = () => {
    setShowBottomActionModal(false);
    setShowUpdateModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>User Metrics</Text>
        <TouchableOpacity
          style={styles.editIconButton}
          onPress={() => setShowBottomActionModal(true)}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color={Colors.light.specialBlue}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statContainer}>
        {/* When using conditional rendering(&&) it gives an error */}
        {userMetrics.age ? (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userMetrics.age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.divider} />
          </>
        ) : (
          <></>
        )}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userMetrics.height}</Text>
          <Text style={styles.statLabel}>cm</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userMetrics.weight}</Text>
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

      <ModalBottomAction
        subject={"Metrics"}
        isVisible={showBottomActionModal}
        setIsVisible={setShowBottomActionModal}
        handleDelete={deleteUserMetrics}
        handleEdit={handleUpdate}
      />

      <ModalUserMetricsUpdate
        isVisible={showUpdateModal}
        setIsVisible={setShowUpdateModal}
        updateData={userMetrics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
