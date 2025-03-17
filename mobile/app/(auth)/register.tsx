import { Text, View } from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  return (
    <View>
      <Text>Register</Text>
      <Text
        onPress={() => {
          router.push("/(auth)/login");
        }}
      >
        Already registered?
      </Text>
    </View>
  );
}
