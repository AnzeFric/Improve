import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import TitleRow from "@/components/global/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TermsItem from "@/components/home/settings/TermsItem";
import termsJson from "@/data/terms.json";
import { AppStyles } from "@/constants/AppStyles";

export default function TermsAndConditionsScreen() {
  const [value, setValue] = useState("");
  const terms = useMemo(() => {
    return termsJson.items;
  }, [termsJson]);

  const filteredTerms = terms.filter(
    (term) =>
      term.title.toLowerCase().includes(value.toLowerCase()) ||
      term.description.toLowerCase().includes(value.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue("");
      };
    }, [])
  );

  return (
    <ScrollView>
      <TitleRow title={"Terms and conditions"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Search"}
            value={value}
            onChangeText={setValue}
          />
          <Ionicons name={"search-outline"} size={20} color={"#888"} />
        </View>

        <View style={{ gap: 10 }}>
          {filteredTerms.map((item, index) => (
            <TermsItem id={item.id} title={item.title} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 30,
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.light.specialBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
