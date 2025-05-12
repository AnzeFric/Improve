import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  searchOptions: Array<string>;
  isFocused: boolean;
  setSelectedItem: (value: string) => void;
  setIsFocused: (isFocused: boolean) => void;
  onPress: () => void;
}

export default function InputDropDown({
  placeholder,
  searchOptions,
  isFocused,
  setSelectedItem,
  setIsFocused,
  onPress,
}: Props) {
  const [value, setValue] = useState("");
  const textInputRef = useRef<TextInput>(null);
  const rotationAnimRef = useRef(new Animated.Value(0)).current;

  // Rotate the caret
  const rotateInterpolate = rotationAnimRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["270deg", "360deg"],
  });

  const AnimatedIonicon = Animated.createAnimatedComponent(Ionicons);

  // Animate rotation when isFocused changes
  useEffect(() => {
    Animated.timing(rotationAnimRef, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const handleOption = (option: string) => {
    setSelectedItem(option);
    setValue(option);
    setIsFocused(false);
  };

  const filteredSearchOptions = searchOptions.filter((searchOption) =>
    searchOption.toLowerCase().includes(value.toLowerCase())
  );

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
          onFocus={() => {
            setIsFocused(true);
          }}
          onPress={onPress}
          style={styles.input}
          ref={textInputRef}
        />
        {/* Animated caret icon */}
        <AnimatedIonicon
          name="caret-down-outline"
          size={20}
          color={"#000"}
          style={{ transform: [{ rotate: rotateInterpolate }] }}
          onPress={() => {
            textInputRef.current?.focus();
          }}
        />
      </View>

      {isFocused && (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {filteredSearchOptions.map((option, index) => (
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
    maxHeight: 200,
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
