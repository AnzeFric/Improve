import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: (item?: any) => void;
  color: string;
}
export default function EditButton({ color, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="create-outline" size={22} color={color} />
    </TouchableOpacity>
  );
}
