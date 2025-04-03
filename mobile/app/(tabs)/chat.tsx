import { Text, View } from "react-native";
import TitleRow from "@/components/global/TitleRow";

export default function ChatScreen() {
  return (
    <View>
      <TitleRow title={"Chat"} hasBackButton={false} />
    </View>
  );
}
