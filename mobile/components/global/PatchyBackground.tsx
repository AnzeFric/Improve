import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface PatchyBackgroundProps {
  children: React.ReactNode;
}

export default function PatchyBackground({ children }: PatchyBackgroundProps) {
  return (
    <View style={styles.container}>
      <View style={styles.patch1} />
      <View style={styles.patch2} />
      <View style={styles.patch3} />
      <View style={styles.patch4} />
      <View style={styles.patch5} />
      <View style={styles.patch7} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.underlayOrange,
  },
  patch1: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    opacity: 0.6,
  },
  patch2: {
    position: "absolute",
    bottom: 150,
    right: 20,
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    opacity: 0.5,
  },
  patch3: {
    position: "absolute",
    top: 200,
    right: 50,
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 40,
    opacity: 0.7,
  },
  patch4: {
    position: "absolute",
    top: 300,
    left: 50,
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 120,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff",
    opacity: 0.5,
  },
  patch5: {
    position: "absolute",
    bottom: 150,
    left: 30,
    width: 90,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 20,
    opacity: 0.6,
  },
  patch7: {
    position: "absolute",
    top: 100,
    right: 150,
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 35,
    opacity: 0.4,
  },
});
