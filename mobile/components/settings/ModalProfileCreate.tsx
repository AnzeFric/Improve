import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useProfile } from "@/hooks/useProfile";

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function ModalProfileCreate({ isVisible, setIsVisible }: Props) {
  const { handleSaveProfile } = useProfile();
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

  // Clear inputs and errors when modal is closed
  useFocusEffect(
    useCallback(() => {
      return () => {
        setAge("");
        setWeight("");
        setHeight("");
        setEmptyFieldsError(false);
        setErrorOccured(false);
      };
    }, [])
  );

  const handleSave = () => {
    setEmptyFieldsError(false);
    setErrorOccured(false);

    if (!weight || !height) {
      setEmptyFieldsError(true);
      return;
    }

    const intAge = parseInt(age);
    const intWeight = parseFloat(weight);
    const intHeight = parseFloat(height);

    handleSaveProfile(intAge, intWeight, intHeight).then((response) => {
      if (response) {
        setIsVisible(false);
      } else {
        setErrorOccured(true);
      }
    });
  };

  return (
    <Modal visible={isVisible} transparent animationType={"fade"}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Create your profile</Text>
          <View style={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                emptyFieldsError && !weight && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            {emptyFieldsError && !weight && (
              <Text style={styles.errorText}>Weight is required</Text>
            )}

            <View
              style={[
                styles.inputContainer,
                emptyFieldsError && !height && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>
            {emptyFieldsError && !height && (
              <Text style={styles.errorText}>Height is required</Text>
            )}

            {errorOccured && (
              <Text style={styles.generalErrorText}>
                Failed to save profile. Please try again.
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    gap: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    justifyContent: "space-between",
    paddingRight: 20,
  },
  inputContainerError: {
    borderColor: Colors.light.destructiveRed,
    borderWidth: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: -5,
  },
  generalErrorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 10,
  },
  saveButton: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
