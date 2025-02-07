import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";

export default function BodyHuman() {
  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");

  // Función para traducir "front" | "back" a un formato compatible
  const mapSide = (clickedSide: "front" | "back"): "left" | "right" | undefined => {
    return clickedSide === "front" ? undefined : undefined; // O deja undefined para que funcione bien
  };

  const handleBodyPartPress = (part: ExtendedBodyPart) => {
    setSelectedParts((prevParts) => {
      const exists = prevParts.some((p) => p.slug === part.slug);

      return exists
        ? prevParts.filter((p) => p.slug !== part.slug)
        : [...prevParts, { ...part, intensity: 1, side: mapSide(side) }];
    });
  };

  const toggleSide = () => setSide((prev) => (prev === "front" ? "back" : "front"));

  return (
    <View style={styles.container}>
      <Body
        data={selectedParts}
        onBodyPartPress={handleBodyPartPress}
        side={side}
        gender="male"  // Cambia a "female" si lo necesitas
        scale={1.7}
        border="#dfdfdf"
        colors={["#0000FF"]}
      />
      <View style={styles.switchContainer}>
        <Text>Side ({side})</Text>
        <Switch onValueChange={toggleSide} value={side === "front"} />
      </View>
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
