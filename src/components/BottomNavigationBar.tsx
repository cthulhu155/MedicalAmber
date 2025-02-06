import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Pantalla de Inicio</Text>
  </View>
);

const Medicamentos = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Pantalla de Medicamentos</Text>
  </View>
);

const Chat = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Pantalla de Chat</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Medicamentos") {
              iconName = "pill";
            } else if (route.name === "Chat") {
              iconName = "chat";
            } else {
              iconName = "help"; // Valor por defecto en caso de que no coincida con ninguna ruta
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6C63FF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#FFF",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
            paddingBottom: 10,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Medicamentos" component={Medicamentos} />
        <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigationBar;