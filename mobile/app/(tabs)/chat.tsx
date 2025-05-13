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
import OpenAI from "openai";
import Config from "react-native-config";
import { ChatItem } from "@/interfaces/chat";

export default function ChatScreen() {
  const [value, setValue] = useState("");
  const [chats, setChats] = useState<Array<ChatItem>>([]);

  const scrollRef = useRef<ScrollView>(null);

  const client = new OpenAI({
    apiKey: Config.OPENAI_API_KEY,
  });

  const handleSendChat = async () => {
    const promptValue = value;
    setValue("");

    const newUserPrompt: ChatItem = { chatType: "User", text: promptValue };
    setChats([...chats, newUserPrompt]);

    try {
      const response = await client.responses.create({
        model: "gpt-4o",
        input: promptValue,
      });

      const newAiResponse: ChatItem = {
        chatType: "Ai",
        text: response.output_text,
      };
      setChats([...chats, newAiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorResponse: ChatItem = {
        chatType: "Ai",
        text: "Sorry, I couldn't process your request. Please try again.",
      };
      setChats([...chats, errorResponse]);
    }
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
