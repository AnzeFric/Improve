import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  placeholder: string;
  searchOptions: Array<string>;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  onPress: () => void;
}

export default function AutoComplete({
  placeholder,
  searchOptions,
  isFocused,
  setIsFocused,
  onPress,
}: Props) {
  const [value, setValue] = useState(
    searchOptions[0].length > 0 ? searchOptions[0] : ""
  );

  const handleOption = (option: string) => {
    setValue(option);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInputContainer,
        ]}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={setValue}
          onFocus={handleFocus}
          onPress={onPress}
          style={styles.input}
        />
        {isFocused ? (
          <Ionicons name={"caret-down-outline"} size={20} color={"#000"} />
        ) : (
          <Ionicons name={"caret-forward-outline"} size={20} color={"#000"} />
        )}
      </View>

      {isFocused && (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {searchOptions.map((option, index) => (
              <TouchableOpacity
                style={[
                  styles.optionContainer,
                  index === 0 && { paddingTop: 0 },
                ]}
                onPress={() => {
                  handleOption(option);
                }}
                key={index}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#eee",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: 10,
  },
  focusedInputContainer: {
    borderColor: Colors.light.specialBlue,
  },
  input: {
    fontSize: 15,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    position: "absolute",
    top: 50,
    backgroundColor: "#fff",
    zIndex: 5,
    borderRadius: 12,
    elevation: 3,
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  optionContainer: {
    borderBottomWidth: 1,
    borderColor: "#cecece",
    paddingVertical: 12,
  },
});
