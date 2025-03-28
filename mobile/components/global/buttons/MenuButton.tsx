import { router, Href } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  path: Href;
}

export default function MenuButton({ path }: Props) {
  return (
    <Ionicons
      name={"settings-sharp"}
      size={30}
      color={"#FFFFFF"}
      onPress={() => {
        router.push(path);
      }}
    />
  );
}
