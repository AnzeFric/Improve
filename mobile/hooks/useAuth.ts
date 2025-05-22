import { Alert } from "react-native";
import { useState, useCallback } from "react";
import useAuthStore from "@/stores/useAuthStore";
import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import { router, useFocusEffect } from "expo-router";

export function useAuth() {
  const {
    isLoggined,
    expiredTimestamp,
    setJwt,
    setExpiredTimestamp,
    setIsLoggined,
  } = useAuthStore();
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
        const jwt = response;
        const decodedJwt = decodeJWT(jwt);

        setJwt(jwt);
        setExpiredTimestamp(decodedJwt.exp);
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
    router.replace("/(auth)/login");
  };

  function decodeJWT(token: string) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid JWT format");
      return;
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decodedPayload;
  }

  return {
    expiredTimestamp,
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
