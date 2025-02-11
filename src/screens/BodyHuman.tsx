import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stylesbody } from "../utils/StyleSheetBody"; 

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
    <SafeAreaView style={stylesbody.safeArea}>
      <LinearGradient
        colors={['#f0f9ff', '#ffffff']}
        style={stylesbody.container}
      >
        <View style={stylesbody.headerContainer}>
          <Text style={stylesbody.title}>Selecciona las zonas afectadas</Text>
          <View style={stylesbody.viewToggleContainer}>
            <TouchableOpacity
              style={[
                stylesbody.viewToggleButton,
                side === "front" && stylesbody.viewToggleButtonActive
              ]}
              onPress={() => setSide("front")}
            >
              <MaterialCommunityIcons 
                name="human-male" 
                size={24} 
                color={side === "front" ? "#fff" : "#582A72"} 
              />
              <Text style={[
                stylesbody.viewToggleText,
                side === "front" && stylesbody.viewToggleTextActive
              ]}>Vista Frontal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                stylesbody.viewToggleButton,
                side === "back" && stylesbody.viewToggleButtonActive
              ]}
              onPress={() => setSide("back")}
            >
              <MaterialCommunityIcons 
                name="human-male-board" 
                size={24} 
                color={side === "back" ? "#fff" : "#582A72"} 
              />
              <Text style={[
                stylesbody.viewToggleText,
                side === "back" && stylesbody.viewToggleTextActive
              ]}>Vista Posterior</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={stylesbody.bodyContainer}>
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
            style={stylesbody.confirmButton}
            onPress={handleConfirmSelection}
          >
            <Text style={stylesbody.buttonText}>Confirmar selección</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}
