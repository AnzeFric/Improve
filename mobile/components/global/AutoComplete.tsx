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
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={handleFocus}
        onPress={onPress}
        style={[styles.input, isFocused && styles.focusedInput]}
      />

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
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.light.inactiveIcon,
    marginBottom: 10,
    paddingHorizontal: 2,
    paddingVertical: 8,
    fontSize: 15,
  },
  focusedInput: {
    borderColor: Colors.light.specialBlue,
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
