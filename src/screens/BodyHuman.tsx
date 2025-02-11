import React, { useState } from "react";
import { StyleSheet, Switch, Text, View, Button } from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  BodyHuman: undefined;
  Medicamentos: { bodyParts: string[] };
};

export default function BodyHuman() {
  const navigation = useNavigation<any>();

  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");

  const bodyPartToSymptom: Record<string, string> = {
    head: "Dolor de cabeza",
    arm: "Dolor muscular",
    hand: "Dolor muscular",
    leg: "Dolor muscular",
    stomach: "Dolor estomacal",
    chest: "Problemas respiratorios"
  };

  const mapSide = (clickedSide: "front" | "back"): "left" | "right" | undefined => {
    return undefined;
  };

  const handleBodyPartPress = (part: ExtendedBodyPart) => {
    setSelectedParts(prevParts => {
      const exists = prevParts.some(p => p.slug === part.slug);
      return exists
        ? prevParts.filter(p => p.slug !== part.slug)
        : [...prevParts, { ...part, intensity: 1, side: mapSide(side) }];
    });
  };

  const toggleSide = () => setSide(prev => (prev === "front" ? "back" : "front"));

  const handleConfirmSelection = () => {
    const selectedSymptoms = selectedParts
      .filter(p => p.slug !== undefined)
      .map(p => bodyPartToSymptom[p.slug!] || p.slug!);
    navigation.navigate("Medicamentos", { bodyParts: selectedSymptoms });
  };

  return (
    <View style={styles.container}>
      <Body
        data={selectedParts}
        onBodyPartPress={handleBodyPartPress}
        side={side}
        gender="male"
        scale={1.4}
        border="#dfdfdf"
        colors={["#0000FF"]}
      />
      <View style={styles.switchContainer}>
        <Text>Side ({side})</Text>
        <Switch onValueChange={toggleSide} value={side === "front"} />
      </View>
      {selectedParts.length > 0 && (
        <View style={styles.confirmButtonContainer}>
          <Button title="Confirmar selección" onPress={handleConfirmSelection} />
        </View>
      )}
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
  confirmButtonContainer: {
    marginTop: 20,
    width: "80%",
  },
});
