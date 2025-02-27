import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  useWindowDimensions,
  Platform,
} from "react-native";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { stylesbody } from "../../utils/Styles/BodyStyle";

type RootStackParamList = {
  [x: string]: any;
  BodyHuman: undefined;
  Medicamentos: { bodyParts: string[] };
};

export default function BodyHuman() {
  const navigation = useNavigation<RootStackParamList>();
  const { width } = useWindowDimensions();
  const BASE_WIDTH = 375; // ancho base típico
  const scaleFactor = width / BASE_WIDTH;

  // Usamos Platform para definir la escala del componente Body
  const bodyScale = Platform.OS === "ios" ? 1.23 * scaleFactor : 1.4 * scaleFactor;

  const [selectedParts, setSelectedParts] = useState<ExtendedBodyPart[]>([]);
  const [side, setSide] = useState<"front" | "back">("front");

  const bodyPartToSymptom: Record<string, string> = {
    head: "Dolor de cabeza",
    arm: "Dolor muscular",
    hand: "Dolor muscular",
    leg: "Dolor muscular",
    stomach: "Dolor estomacal",
    chest: "Problemas respiratorios",
  };

  const handleBodyPartPress = (part: ExtendedBodyPart) => {
    // Grupo "forearm" y "hands"
    if (["forearm", "hands"].includes(part.slug || "")) {
      const isSelected = selectedParts.some(
        (p) => p.slug === "forearm" || p.slug === "hands"
      );
      if (isSelected) {
        setSelectedParts((prevParts) =>
          prevParts.filter((p) => p.slug !== "forearm" && p.slug !== "hands")
        );
      } else {
        setSelectedParts((prevParts) => [
          ...prevParts,
          { slug: "forearm", intensity: 1 },
          { slug: "hands", intensity: 1 },
        ]);
      }
    }
    // Grupo "quadriceps" y "adductors"
    else if (["quadriceps", "adductors"].includes(part.slug || "")) {
      const isSelected = selectedParts.some(
        (p) => p.slug === "quadriceps" || p.slug === "adductors"
      );
      if (isSelected) {
        setSelectedParts((prevParts) =>
          prevParts.filter(
            (p) => p.slug !== "quadriceps" && p.slug !== "adductors"
          )
        );
      } else {
        setSelectedParts((prevParts) => [
          ...prevParts,
          { slug: "quadriceps", intensity: 1 },
          { slug: "adductors", intensity: 1 },
        ]);
      }
    }
    // Grupo "tibialis" y "calves"
    else if (["tibialis", "calves"].includes(part.slug || "")) {
      const isSelected = selectedParts.some(
        (p) => p.slug === "tibialis" || p.slug === "calves"
      );
      if (isSelected) {
        setSelectedParts((prevParts) =>
          prevParts.filter(
            (p) => p.slug !== "tibialis" && p.slug !== "calves"
          )
        );
      } else {
        setSelectedParts((prevParts) => [
          ...prevParts,
          { slug: "tibialis", intensity: 1 },
          { slug: "calves", intensity: 1 },
        ]);
      }
    }
    // Toggle normal para el resto
    else {
      setSelectedParts((prevParts) => {
        const exists = prevParts.some((p) => p.slug === part.slug);
        return exists
          ? prevParts.filter((p) => p.slug !== part.slug)
          : [...prevParts, { ...part, intensity: 1 }];
      });
    }
  };

  const toggleSide = () =>
    setSide((prev) => (prev === "front" ? "back" : "front"));

  const handleConfirmSelection = () => {
    if (selectedParts.length === 0) {
      Alert.alert("Error", "Selecciona al menos una parte del cuerpo.");
      return;
    }

    const selectedSymptoms = selectedParts
      .filter((p) => p.slug)
      .map((p) => bodyPartToSymptom[p.slug!] || p.slug!);

    navigation.navigate("Medicamentos", { bodyParts: selectedSymptoms });
  };

  return (
    <SafeAreaView style={stylesbody.safeArea}>
      <LinearGradient colors={["#f0f9ff", "#ffffff"]} style={stylesbody.container}>
        <View style={stylesbody.headerContainer}>
          <Text style={[stylesbody.title, { fontSize: 23 * scaleFactor }]}>
            Selecciona las zonas afectadas
          </Text>
          <View style={stylesbody.viewToggleContainer}>
            <TouchableOpacity
              style={[
                stylesbody.viewToggleButton,
                side === "front" && stylesbody.viewToggleButtonActive,
              ]}
              onPress={() => setSide("front")}
              accessibilityLabel="Vista Frontal"
            >
              <MaterialCommunityIcons
                name="human-male"
                size={24 * scaleFactor}
                color={side === "front" ? "#fff" : "#582A72"}
              />
              <Text
                style={[
                  stylesbody.viewToggleText,
                  side === "front" && stylesbody.viewToggleTextActive,
                  { fontSize: 16 * scaleFactor },
                ]}
              >
                Vista Frontal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                stylesbody.viewToggleButton,
                side === "back" && stylesbody.viewToggleButtonActive,
              ]}
              onPress={() => setSide("back")}
              accessibilityLabel="Vista Posterior"
            >
              <MaterialCommunityIcons
                name="human-male-board"
                size={24 * scaleFactor}
                color={side === "back" ? "#fff" : "#582A72"}
              />
              <Text
                style={[
                  stylesbody.viewToggleText,
                  side === "back" && stylesbody.viewToggleTextActive,
                  { fontSize: 16 * scaleFactor },
                ]}
              >
                Vista Posterior
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={stylesbody.bodyContainer}>
          <Body
            data={selectedParts}
            onBodyPartPress={handleBodyPartPress}
            side={side}
            gender="male"
            scale={bodyScale}
            border="#dfdfdf"
            colors={["#2196F3"]}
          />
        </View>

        <TouchableOpacity
          style={[
            stylesbody.confirmButton,
            selectedParts.length === 0 && { backgroundColor: "#aaa" },
          ]}
          onPress={handleConfirmSelection}
          disabled={selectedParts.length === 0}
          accessibilityLabel="Confirmar selección"
        >
          <Text style={[stylesbody.buttonText, { fontSize: 18 * scaleFactor }]}>
            Confirmar selección
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}