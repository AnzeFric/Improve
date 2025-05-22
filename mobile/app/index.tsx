import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/global/LoadingScreen";

export default function EntryScreen() {
  const { expiredTimestamp, isLoggined, handleLogout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (isLoggined) {
          const now = Date.now();
          const tokenExpiresAt = new Date(expiredTimestamp * 1000);
          const timeRemaining = tokenExpiresAt.getTime() - now;
          const threshold = 4 * 24 * 60 * 60 * 1000; // 4 days

          if (timeRemaining < threshold) {
            handleLogout();
            setLoading(false);
            return;
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Initialization error:", error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return isLoggined ? (
    <Redirect href={"/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
}
