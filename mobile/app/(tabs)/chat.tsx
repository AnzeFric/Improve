import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import OpenAI from "openai";
import Config from "react-native-config";
import { ChatItem } from "@/interfaces/chat";
import AiItem from "@/components/chat/AiItem";
import { Ionicons } from "@expo/vector-icons";
import { AppStyles } from "@/constants/AppStyles";
import TitleRow from "@/components/global/TitleRow";
import DisplayChatLog from "@/components/chat/DisplayChatLog";
import PatchyBackground from "@/components/global/PatchyBackground";

export default function ChatScreen() {
  const [value, setValue] = useState("");
  const [loadingResponse, setLoadingReponse] = useState(false);
  const [chats, setChats] = useState<Array<ChatItem>>([]);

  const textInputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const client = new OpenAI({
    apiKey: Config.OPENAI_API_KEY,
  });

  const handleSendChat = async () => {
    setLoadingReponse(true);
    textInputRef.current?.blur(); // Remove text cursor and keyboard

    const promptValue = value;
    setValue("");

    const newUserPrompt: ChatItem = { chatType: "User", text: promptValue };
    const updatedChats = [...chats, newUserPrompt];
    setChats(updatedChats);

    try {
      const response = await client.responses.create({
        model: "gpt-4o",
        input: promptValue,
      });

      const newAiResponse: ChatItem = {
        chatType: "Ai",
        text: response.output_text,
      };
      setChats([...updatedChats, newAiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      const errorResponse: ChatItem = {
        chatType: "Ai",
        text: "Sorry, I couldn't process your question. Please try again.",
      };
      setChats([...updatedChats, errorResponse]);
    }

    scrollRef.current?.scrollToEnd({ animated: true });
    setLoadingReponse(false);
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
            <AiItem
              prompt={
                "Hi! I am your AI fitness coach, here to help with workouts, nutrition, and motivation. What can I do for you?"
              }
            />
            <DisplayChatLog chats={chats} />
          </View>
        </ScrollView>

        <View
          style={[
            AppStyles.inputContainer,
            styles.inputContainer,
            loadingResponse && styles.disabledInput,
          ]}
        >
          <TextInput
            ref={textInputRef}
            style={AppStyles.input}
            placeholder={loadingResponse ? "Generating response..." : "Chat"}
            value={value}
            onChangeText={setValue}
            multiline
            numberOfLines={10}
          />
          <TouchableOpacity onPress={handleSendChat} disabled={loadingResponse}>
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
  disabledInput: {
    backgroundColor: "#f3f3f3",
  },
});
