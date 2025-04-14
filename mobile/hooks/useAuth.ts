import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import useAuthStore from "@/stores/useAuthStore";
import Config from "react-native-config";
import { useCleanup } from "./useCleanup";

export function useAuth() {
  const {
    jwt,
    expiresIn,
    isLoggined,
    isFirstLogin,
    setJwt,
    setExpiresIn,
    setIsLoggined,
    setIsFirstLogin,
  } = useAuthStore();
  const { resetStores } = useCleanup();
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
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        router.push("/(auth)/login");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://${Config.API_DEVELOPMENT_IP}:${Config.API_PORT}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setJwt(data.data.token);
        setExpiresIn(data.data.expiresIn);
        setIsLoggined(true);

        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    resetStores();
    router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
  };

  return {
    jwt,
    expiresIn,
    isLoggined,
    isFirstLogin,
    setIsFirstLogin,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    secureText,
    setSecureText,
    handleRegister,
    handleLogin,
    handleLogout,
  };
}
