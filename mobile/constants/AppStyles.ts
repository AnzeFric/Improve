import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const AppStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0.3,
    paddingRight: 20,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  borderButton: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.specialBlue,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  borderButtonText: {
    fontSize: 16,
    color: Colors.light.specialBlue,
    fontWeight: "bold",
    textAlign: "center",
  },
});
