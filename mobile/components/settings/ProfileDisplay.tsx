import { Text, View, StyleSheet } from "react-native";
import { Profile } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";

interface Props {
  profile: Profile;
}

export default function ProfileDisplay({ profile }: Props) {
  return (
    <View>
      <Text style={styles.profileDetails}>
        {profile.weight} kg · {profile.age} years old
      </Text>
      <View style={styles.bmiContainer}>
        <Text style={styles.bmiText}>28.5kg/m² (Overweight)</Text>
        <Text style={styles.bmiNote}>
          Note: BMI is not always accurate, especially for athletes.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
