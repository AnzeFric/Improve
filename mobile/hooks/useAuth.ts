import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { API_DEVELOPMENT_IP, API_PORT } from "@env";
import useAuthStore from "@/stores/useAuthStore";

export function useAuth() {
  const { setIsLoggined } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setUsername("");
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
        `http://${API_DEVELOPMENT_IP}:${API_PORT}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
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
        `http://${API_DEVELOPMENT_IP}:8080/api/auth/login`,
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
      if (response.ok) {
        setIsLoggined(true);
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggined(false);
    router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
  };

  // Function to delete current user account
  const handleDelete = () => {
    console.log("Account delete clicked");
  };

  return {
    username,
    setUsername,
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
    handleDelete,
  };
}
