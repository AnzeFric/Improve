type ChatType = "User" | "Ai";

export interface ChatItem {
  chatType: ChatType;
  text: string;
}
