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
import { useUserMetrics } from "@/hooks/useUserMetrics";
import { AppStyles } from "@/constants/AppStyles";
import { UserMetrics } from "@/interfaces/user";

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  updateData?: UserMetrics;
}

export default function ModalUserMetricsCreate({
  isVisible,
  setIsVisible,
  updateData,
}: Props) {
  const { saveUserMetrics, updateUserMetrics } = useUserMetrics();
  const [age, setAge] = useState(updateData?.age?.toString() || "");
  const [weight, setWeight] = useState<string>(
    updateData?.weight.toString() || ""
  );
  const [height, setHeight] = useState<string>(
    updateData?.height.toString() || ""
  );
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

    updateData
      ? updateUserMetrics(intAge, intWeight, intHeight).then((response) => {
          if (response) {
            setIsVisible(false);
          } else {
            setErrorOccured(true);
          }
        })
      : saveUserMetrics(intAge, intWeight, intHeight).then((response) => {
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
          <Text style={styles.title}>
            {updateData ? "Update" : "Create"} your Metrics
          </Text>
          <View style={styles.contentContainer}>
            <View style={AppStyles.inputContainer}>
              <TextInput
                style={AppStyles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            <View
              style={[
                AppStyles.inputContainer,
                emptyFieldsError && !weight && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={AppStyles.input}
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
                AppStyles.inputContainer,
                emptyFieldsError && !height && styles.inputContainerError,
              ]}
            >
              <TextInput
                style={AppStyles.input}
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
                Failed to {updateData ? "update" : "save"} user metrics. Please
                try again.
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  AppStyles.button,
                  { backgroundColor: Colors.light.destructiveRed },
                ]}
                onPress={() => setIsVisible(false)}
              >
                <Text style={AppStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={AppStyles.button} onPress={handleSave}>
                <Text style={AppStyles.buttonText}>Save</Text>
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
  inputContainerError: {
    borderColor: Colors.light.destructiveRed,
    borderWidth: 1,
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
});
