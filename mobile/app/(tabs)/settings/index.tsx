import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { User } from "@/interfaces/user";

const fakeUser: User = {
  firstName: "Anže",
  lastName: "Fric",
  age: 22,
  weight: 96,
};

export default function SettingsScreen() {
  const { handleLogout, handleDelete } = useAuth();
  const [user, setUser] = useState<User>(fakeUser);

  return (
    <View style={styles.container}>
      <TitleRow title="Settings" hasBackButton={true} />

      <View style={styles.contentContainer}>
        <View style={styles.profileCard}>
          <Ionicons
            name="person-circle"
            size={64}
            color={Colors.light.specialBlue}
          />
          <Text style={styles.profileName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.profileDetails}>
            {user.weight} kg · {user.age} years old
          </Text>
          <View style={styles.bmiContainer}>
            <Text style={styles.bmiText}>28.5kg/m² (Overweight)</Text>
            <Text style={styles.bmiNote}>
              Note: BMI is not always accurate, especially for athletes.
            </Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(tabs)/settings/terms");
            }}
          >
            <Text style={styles.buttonText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  profileDetails: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  bmiContainer: {
    backgroundColor: "#f1f6ff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
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
  buttonsContainer: {
    gap: 15,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.destructiveRed,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.light.destructiveRed,
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
