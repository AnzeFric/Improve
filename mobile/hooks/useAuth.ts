import { Alert } from "react-native";
import { useState, useCallback } from "react";
import useAuthStore from "@/stores/useAuthStore";
import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import { router, useFocusEffect } from "expo-router";

export function useAuth() {
  const { isLoggined, setJwt, setExpiresIn, setIsLoggined } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSecureText(true);
      };
    }, [])
  );

  const handleRegister = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/auth/register`,
        "POST",
        JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
      );

      if (response) {
        router.push("/(auth)/login");
      } else {
        Alert.alert(
          "Error",
          "Make sure all the fields are filled and confirm password matches."
        );
      }
    } catch (error) {
      console.error("Error while registering: ", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/auth/login`,
        "POST",
        JSON.stringify({
          email: email,
          password: password,
        })
      );

      if (response) {
        setJwt(response.token);
        setExpiresIn(response.expiresIn);
        setIsLoggined(true);

        router.push("/(tabs)/home");
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
      console.error("Error while logging in: ", error);
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().reset();
    router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
  };

  return {
    isLoggined,
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
    handleLogin,
    handleLogout,
  };
}
