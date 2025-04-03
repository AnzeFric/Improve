import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import TitleRow from "@/components/global/TitleRow";
import { Ionicons } from "@expo/vector-icons";
import UserItem from "@/components/chat/UserItem";
import AiItem from "@/components/chat/AiItem";
import PatchyBackground from "@/components/global/PatchyBackground";

export default function ChatScreen() {
  const [value, setValue] = useState("");

  return (
    <PatchyBackground>
      <View style={styles.container}>
        <TitleRow title={"Chat"} hasBackButton={false} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>
            <UserItem prompt={"Make this app better!"} />
            <AiItem prompt={"Do it yourself."} />
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Chat"}
            value={value}
            onChangeText={setValue}
          />
          <Ionicons name={"arrow-up-circle-outline"} size={30} />
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
    paddingVertical: 18,
    paddingLeft: 10,
  },
});
