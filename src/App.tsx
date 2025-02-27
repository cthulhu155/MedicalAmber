import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "./hooks/useAuth"; // Hook de autenticación
import Login from "../src/screens/(auth)/Login";
import Register from "../src/screens/(auth)/Register";
import NavigationBar from "./components/NavigationBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Evita que la pantalla de carga desaparezca antes de que la app esté lista
SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, loading } = useAuth(); // Estado de autenticación

  useEffect(() => {
    const hideSplash = async () => {
      if (!loading) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? "HomeTabs" : "Login"} screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <Stack.Screen name="HomeTabs" component={NavigationBar} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };
    prepareApp();
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
