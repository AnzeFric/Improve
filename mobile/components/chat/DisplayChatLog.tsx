import UserItem from "./UserItem";
import AiItem from "./AiItem";
import { ChatItem } from "@/interfaces/chat";

interface Props {
  chats: Array<ChatItem>;
}

export default function DisplayChatLog({ chats }: Props) {
  return (
    <>
      {chats.length > 0 &&
        chats.map((chat, index) =>
          chat.chatType === "User" ? (
            <UserItem prompt={chat.text} key={index} />
          ) : (
            <AiItem prompt={chat.text} key={index} />
          )
        )}
    </>
  );
}
