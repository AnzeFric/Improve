import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import TitleRow from "@/components/global/TitleRow";
import { Ionicons } from "@expo/vector-icons";
import UserItem from "@/components/chat/UserItem";
import AiItem from "@/components/chat/AiItem";
import PatchyBackground from "@/components/global/PatchyBackground";
import DisplayChatLog from "@/components/chat/DisplayChatLog";
import { AppStyles } from "@/constants/AppStyles";

export default function ChatScreen() {
  const [value, setValue] = useState("");
  const [chats, setChats] = useState<Array<string>>([]);

  const scrollRef = useRef<ScrollView>(null);

  const handleSendChat = () => {
    setChats([...chats, value]);
    setValue("");
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <PatchyBackground>
      <View style={styles.container}>
        <TitleRow title={"Chat"} hasBackButton={false} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          ref={scrollRef}
        >
          <View style={styles.contentContainer}>
            <UserItem prompt={"User example: Make this app better!"} />
            <AiItem prompt={"Ai example: Do it yourself."} />
            <DisplayChatLog chats={chats} />
          </View>
        </ScrollView>

        <View style={[AppStyles.inputContainer, styles.inputContainer]}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Chat"}
            value={value}
            onChangeText={setValue}
            multiline
            numberOfLines={10}
          />
          <TouchableOpacity onPress={handleSendChat}>
            <Ionicons name={"arrow-up-circle-outline"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </PatchyBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 15,
  },
  inputContainer: {
    paddingHorizontal: 10,
    margin: 10,
  },
});
