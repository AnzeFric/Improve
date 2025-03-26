import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import TitleRow from "@/components/global/TitleRow";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function TermsAndConditionsScreen() {
  return (
    <View>
      <TitleRow title={"Terms and conditions"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <Text>Search bar</Text>
        <Text>Map to display items</Text>
        <Text> -- items redirect to terms/[id]</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push(`/(tabs)/home/settings/terms/detail/${0}`);
          }}
        >
          <Text style={styles.buttonText}>Test redirect to item 0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.light.specialBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
