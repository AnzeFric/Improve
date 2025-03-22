import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import TitleRow from "@/components/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { User } from "@/interfaces/user";
import ProfileDisplay from "@/components/settings/ProfileDisplay";
import ProfileCreate from "@/components/settings/ProfileCreate";
import useProfileStore from "@/stores/useProfileStore";

const fakeUser: User = {
  id: "123f1d21d12d",
  firstName: "Anže",
  lastName: "Fric",
  age: 22,
  weight: 96,
};

export default function SettingsScreen() {
  const { handleLogout, handleDelete } = useAuth();
  const [user, setUser] = useState<User>(fakeUser);
  const { profile } = useProfileStore();

  useEffect(() => {
    // Get user
    // Get profile with user id
  }, []);

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

          {profile ? <ProfileDisplay profile={profile} /> : <ProfileCreate />}
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
