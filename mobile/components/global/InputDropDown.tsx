import React, { useState, useRef, useEffect } from "react";
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
  setIsFocused: (isFocused: boolean) => void;
  onPress: () => void;
}

export default function InputDropDown({
  placeholder,
  searchOptions,
  isFocused,
  setIsFocused,
  onPress,
}: Props) {
  const [value, setValue] = useState(
    searchOptions[0].length > 0 ? searchOptions[0] : ""
  );

  const textInputRef = useRef<TextInput>(null);

  // Create an Animated Value for rotation
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // Animate rotation when isFocused changes
  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  // Interpolate the animated value to a rotation angle
  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["270deg", "360deg"],
  });

  // Wrap the Ionicons component with Animated
  const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

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
          ref={textInputRef}
        />
        {/* Animated caret icon */}
        <AnimatedIonicons
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
