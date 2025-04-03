import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

interface Props {
  id: number;
  title: string;
}

export default function TermsItem({ id, title }: Props) {
  const handlePress = () => {
    router.push(`/(tabs)/home/settings/terms/detail/${id}`);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
