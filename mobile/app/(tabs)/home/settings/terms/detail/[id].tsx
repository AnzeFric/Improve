import { Text, View, StyleSheet } from "react-native";
import TitleRow from "@/components/global/TitleRow";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { items } from "@/data/terms.json";
import { Terms } from "@/interfaces/terms";

export default function TermsAndConditionsDetail() {
  const { id } = useLocalSearchParams();

  const data: Terms | undefined = useMemo(() => {
    return items.find((item) => item.id === Number(id));
  }, [id]);

  if (!data) {
    return (
      <View>
        <TitleRow title={"Item not found"} hasBackButton={true} />
        <View style={styles.contentContainer}>
          <Text>
            Item not found, return to the previous page and try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <TitleRow title={data.title} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <Text>{data.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
});
