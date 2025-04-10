import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/useAuth";
import { AppStyles } from "@/constants/AppStyles";

export default function LoginScreen() {
  const {
    email,
    password,
    secureText,
    setEmail,
    setPassword,
    setSecureText,
    handleLogin,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Log in to continue your journey.</Text>

      <View style={styles.contentContainer}>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            autoComplete={"off"}
          />
        </View>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            autoCapitalize={"none"}
            autoComplete={"off"}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color={"#888"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push("/(auth)/register")}>
        Not a member? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  contentContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 50,
    color: "#4a90e2",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
