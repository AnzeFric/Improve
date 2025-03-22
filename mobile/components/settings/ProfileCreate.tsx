import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import ModalProfileCreate from "./ModalProfileCreate";

export default function ProfileCreate() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Create your profile</Text>
      </TouchableOpacity>
      <ModalProfileCreate isVisible={isVisible} setIsVisible={setIsVisible} />
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
