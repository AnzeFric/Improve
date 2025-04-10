import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { User } from "@/interfaces/user";
import UserMetricsDisplay from "@/components/home/settings/UserMetricsDisplay";
import UserMetricsCreate from "@/components/home/settings/UserMetricsCreate";
import useUserMetricsStore from "@/stores/useUserMetricsStore";
import { useUserMetrics } from "@/hooks/useUserMetrics";

const fakeUser: User = {
  firstName: "Anže",
  lastName: "Fric",
  age: 22,
  weight: 96,
};

export default function SettingsScreen() {
  const { handleLogout, handleDelete } = useAuth();
  const [user, setUser] = useState<User>(fakeUser);
  const { userMetrics } = useUserMetricsStore();
  const { getUserMetrics } = useUserMetrics();

  useEffect(() => {
    if (!userMetrics) {
      getUserMetrics();
    }
  }, [userMetrics]);

  return (
    <ScrollView>
      <TitleRow title="Settings" hasBackButton={true} />

      <View style={styles.contentContainer}>
        <View style={styles.userMetricsCard}>
          <Ionicons
            name="person-circle"
            size={64}
            color={Colors.light.specialBlue}
          />
          <Text style={styles.userMetricsName}>
            {user.firstName} {user.lastName}
          </Text>

          {userMetrics ? (
            <UserMetricsDisplay userMetrics={userMetrics} />
          ) : (
            <UserMetricsCreate />
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(tabs)/home/settings/terms");
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  userMetricsCard: {
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
  userMetricsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  buttonsContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.destructiveRed,
    paddingVertical: 10,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.light.destructiveRed,
  },
  deleteButtonContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
