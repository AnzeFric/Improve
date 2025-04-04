import UserItem from "./UserItem";
import AiItem from "./AiItem";

interface Props {
  chats: Array<string>;
}

export default function DisplayChatLog({ chats }: Props) {
  return (
    <>
      {chats.length > 0 &&
        chats.map((chat, index) => <UserItem prompt={chat} key={index} />)}
    </>
  );
}
