import { Text, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useProfile } from "@/hooks/useProfile";

interface Props {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export default function ModalProfileDisplay({
  isVisible,
  setIsVisible,
}: Props) {
  const { handleDeleteProfile } = useProfile();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile Options</Text>

            <TouchableOpacity style={styles.modalButton}>
              <Ionicons
                name="create-outline"
                size={20}
                color={Colors.light.specialBlue}
              />
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteProfile}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color={Colors.light.destructiveRed}
              />
              <Text style={styles.deleteText}>Delete Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalContent: {
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  editText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.specialBlue,
  },
  deleteText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.destructiveRed,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
