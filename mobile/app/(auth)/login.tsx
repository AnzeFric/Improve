import { Text, View } from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <View>
      <Text>Login</Text>
      <Text
        onPress={() => {
          router.push("/(auth)/register");
        }}
      >
        Not yet registered?
      </Text>
    </View>
  );
}
