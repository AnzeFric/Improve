import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import ModalUserMetricsCreate from "./ModalUserMetricsCreate";
import { AppStyles } from "@/constants/AppStyles";

export default function UserMetricsCreate() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={AppStyles.button}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={AppStyles.buttonText}>Create your Metrics</Text>
      </TouchableOpacity>
      <ModalUserMetricsCreate
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}
