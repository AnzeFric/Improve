import { Text, TouchableOpacity } from "react-native";
import { Timeline } from "@/interfaces/statistics";
import { AppStyles } from "@/constants/AppStyles";

interface Props {
  text: Timeline;
  timeline: Timeline;
  setTimeline: (timeline: Timeline) => void;
}

export default function ButtonSelectable({
  text,
  timeline,
  setTimeline,
}: Props) {
  return (
    <TouchableOpacity
      style={timeline === text ? AppStyles.button : AppStyles.borderButton}
      onPress={() => setTimeline(text)}
    >
      <Text
        style={
          timeline === text ? AppStyles.buttonText : AppStyles.borderButtonText
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
