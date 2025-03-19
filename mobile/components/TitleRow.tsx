import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
}

export default function TitleRow({ title, hasBackButton, menuButton }: Props) {
  return (
    <View style={styles.container}>
      {hasBackButton && (
        <Ionicons
          name={"arrow-back"}
          size={28}
          style={styles.backArrow}
          onPress={() => {
            router.back;
          }}
        />
      )}
      <Text style={[styles.titleText, hasBackButton && { paddingLeft: 40 }]}>
        {title}
      </Text>
      {menuButton && <View>{menuButton}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.light.specialBlue,
    paddingHorizontal: 20,
    paddingVertical: 8,
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
});
