import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Medicamentos() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenText}>Pantalla de Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});