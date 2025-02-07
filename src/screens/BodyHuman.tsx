import React from "react";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Body from "react-native-body-highlighter";

export default function BodyHuman() {
  return (
    <View style={styles.container}>
      <Body
        data={[
          { slug: "chest", intensity: 1, side: "left" },
          { slug: "biceps", intensity: 2 },
        ]}
        gender="female"
        side="front"
        scale={1.7}
        border="#dfdfdf"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});