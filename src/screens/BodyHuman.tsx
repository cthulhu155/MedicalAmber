import React, { useState } from "react";
import { StyleSheet, Switch, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

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
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#f0f9ff', '#ffffff']}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Selecciona las zonas afectadas</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Vista {side === "front" ? "Frontal" : "Posterior"}</Text>
            <Switch 
              onValueChange={toggleSide} 
              value={side === "front"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={side === "front" ? "#2196F3" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <Body
            data={selectedParts}
            onBodyPartPress={handleBodyPartPress}
            side={side}
            gender="male"
            scale={1.4}
            border="#dfdfdf"
            colors={["#2196F3"]}
          />
        </View>

        {selectedParts.length > 0 && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmSelection}
          >
            <Text style={styles.buttonText}>Confirmar selección</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 12,
  },
  switchText: {
    marginRight: 10,
    fontSize: 16,
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
