import { View } from "react-native";
import { Redirect } from "expo-router";

export default function EntryScreen() {
  return <Redirect href={"/(auth)/login"} />;
}
