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
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/AppStyles";

export default function RegisterScreen() {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    secureText,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setSecureText,
    handleRegister,
  } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to <Text style={styles.colorText}>Improve</Text>!
      </Text>
      <Text style={styles.subtitle}>Embark on a new chapter in your life.</Text>

      <View style={styles.contentContainer}>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"First name"}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize={"words"}
            autoComplete={"off"}
          />
        </View>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Last name"}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize={"words"}
            autoComplete={"off"}
          />
        </View>
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
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Confirm password"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize={"none"}
            autoComplete={"off"}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => router.push("/(auth)/login")}>
        Already a member? Login
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
  colorText: {
    color: Colors.light.specialBlue,
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
