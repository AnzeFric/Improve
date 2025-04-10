import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function EntryScreen() {
  const { isLoggined } = useAuth();

  return isLoggined ? (
    <Redirect href={"/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
}
