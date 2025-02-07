import { StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";
import Body, { ExtendedBodyPart } from "react-native-body-highlighter";
import React from "react";

export default function BodyHuman() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<ExtendedBodyPart>({
    slug: "biceps",
    intensity: 2,
    side: "right",
  });
  const [side, setSide] = useState<"front" | "back">("front");
  const [gender, setGender] = useState<"male" | "female">("male");

  const sideSwitch = () =>
    setSide((previousState: string) => (previousState === "front" ? "back" : "front"));

  const toggleGenderSwitch = () => {
    setGender((previousState: string) =>
      previousState === "male" ? "female" : "male"
    );
  };

  return (
    <View style={styles.container}>
      <Body
        data={[
          { slug: "chest", intensity: 1, side: "left" },
          { slug: "biceps", intensity: 1 },
          selectedBodyPart,
        ]}
        onBodyPartPress={(e, side) =>
          setSelectedBodyPart({ slug: e.slug, intensity: 2, side })
        }
        gender={gender}
        side={side}
        scale={1.7}
        border="#dfdfdf"
      />
      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <Text>Side ({side})</Text>
          <Switch onValueChange={sideSwitch} value={side === "front"} />
        </View>
        <View style={styles.switch}>
          <Text>Gender ({gender})</Text>
          <Switch
            onValueChange={toggleGenderSwitch}
            value={gender === "male"}
          />
        </View>
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
    gap: 30,
  },
  switch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});