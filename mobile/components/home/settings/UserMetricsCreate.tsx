import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import ModalUserMetricsCreate from "./ModalUserMetricsCreate";

export default function UserMetricsCreate() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Create your Metrics</Text>
      </TouchableOpacity>
      <ModalUserMetricsCreate
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
