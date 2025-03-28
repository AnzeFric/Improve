import { Ionicons } from "@expo/vector-icons";

interface Props {
  color: string;
  onPress: () => void;
}

export default function CircleCheckButton({ color, onPress }: Props) {
  return (
    <Ionicons
      name={"checkmark-circle-outline"}
      size={28}
      color={color}
      onPress={onPress}
    />
  );
}
