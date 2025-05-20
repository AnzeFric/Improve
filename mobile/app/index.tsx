import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/global/LoadingScreen";

export default function EntryScreen() {
  const { issued, expiresIn, isLoggined, handleLogout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // issued is only set if loggined
    if (issued) {
      const now = new Date();
      const issuedDate = new Date(issued);
      const msDifference = now.getTime() - issuedDate.getTime();

      // If more than half the token time has been used up
      if (msDifference > expiresIn / 2) {
        handleLogout();
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : isLoggined ? (
    <Redirect href={"/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
}
