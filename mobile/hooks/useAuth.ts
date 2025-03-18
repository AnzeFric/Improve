import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { API_DEVELOPMENT_IP } from "@env";

function useAuth() {
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
        `http://${API_DEVELOPMENT_IP}:8080/api/auth/register`,
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
        router.push("/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
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
  };
}

export { useAuth };
