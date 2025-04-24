import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";
import TitleRow from "@/components/global/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import UserMetricsDisplay from "@/components/home/settings/UserMetricsDisplay";
import UserMetricsCreate from "@/components/home/settings/UserMetricsCreate";
import { useUser } from "@/hooks/useUser";
import { useUserMetrics } from "@/hooks/useUserMetrics";
import { AppStyles } from "@/constants/AppStyles";
import { useSplit } from "@/hooks/useSplit";
import SplitDisplay from "@/components/home/settings/SplitDisplay";

export default function SettingsScreen() {
  const { handleLogout } = useAuth();
  const { firstName, lastName, deleteUser } = useUser();
  const { userMetrics, getUserMetrics } = useUserMetrics();
  const { splitName, splitIntensity, splitTrainingDays, saveSplit } =
    useSplit();

  useEffect(() => {
    if (!userMetrics) {
      getUserMetrics();
    }
  }, [userMetrics, splitName]);

  const handleSelectSplit = (
    name: string,
    intensity: string,
    customTrainingDays: Array<string> | undefined
  ) => {
    if (customTrainingDays) {
      saveSplit(name, intensity, customTrainingDays);
    } else {
      saveSplit(name, intensity);
    }
  };

  return (
    <ScrollView>
      <TitleRow title="Settings" hasBackButton={true} />

      <View style={styles.contentContainer}>
        <View style={[styles.itemCard, { alignItems: "center" }]}>
          <Ionicons
            name="person-circle"
            size={64}
            color={Colors.light.specialBlue}
          />
          <Text style={styles.itemTitle}>
            {firstName} {lastName}
          </Text>

          {userMetrics ? (
            <UserMetricsDisplay userMetrics={userMetrics} />
          ) : (
            <UserMetricsCreate />
          )}
        </View>

        <View style={styles.itemCard}>
          <SplitDisplay
            splitName={splitName}
            splitIntensity={splitIntensity}
            splitTrainingDays={splitTrainingDays}
            handleSelectSplit={handleSelectSplit}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              AppStyles.borderButton,
              { borderColor: Colors.light.destructiveRed },
            ]}
            onPress={handleLogout}
          >
            <Text
              style={[
                AppStyles.borderButtonText,
                { color: Colors.light.destructiveRed },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => {
              router.push("/(tabs)/home/settings/terms");
            }}
          >
            <Text style={AppStyles.buttonText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity
              style={[
                AppStyles.button,
                { backgroundColor: Colors.light.destructiveRed },
              ]}
              onPress={deleteUser}
            >
              <Text style={AppStyles.buttonText}>Delete Account</Text>
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
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 12,
  },
  buttonsContainer: {
    gap: 15,
  },
  deleteButtonContainer: {
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
