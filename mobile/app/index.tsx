import { Redirect } from "expo-router";
import useAuthStore from "@/stores/useAuthStore";

export default function EntryScreen() {
  const { isLoggined } = useAuthStore();

  return isLoggined ? (
    <Redirect href={"/(tabs)/home"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
}
