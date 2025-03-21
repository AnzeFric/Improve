import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
}

export default function TitleRow({ title, hasBackButton, menuButton }: Props) {
  return (
    <LinearGradient
      colors={["#4A90E2", "#3e78c3", "#315ea0", "#2c4869"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0.4, 0.59, 0.78, 1]} // Color stops
      style={styles.container}
    >
      {hasBackButton && (
        <Ionicons
          name={"arrow-back"}
          size={28}
          style={styles.backArrow}
          onPress={() => {
            router.back();
          }}
        />
      )}
      <Text style={[styles.titleText, hasBackButton && { paddingLeft: 40 }]}>
        {title}
      </Text>
      {menuButton && <View style={styles.menuIcon}>{menuButton}</View>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.light.specialBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backArrow: {
    alignSelf: "center",
    color: "#FFFFFF",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
    color: "#FFFFFF",
  },
  menuIcon: {
    justifyContent: "center",
  },
});
