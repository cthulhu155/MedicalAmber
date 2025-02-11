import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "./hooks/useAuth"; // Importa el hook de autenticación
import Login from "../src/screens/(auth)/Login";
import Register from "../src/screens/(auth)/Register";
import BottomNavigationBar from "./components/BottomNavigationBar";

SplashScreen.preventAutoHideAsync(); // Evita que la pantalla de carga desaparezca automáticamente

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, loading } = useAuth(); // Obtiene el usuario autenticado

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync(); // Oculta la pantalla de carga cuando ya tenemos el estado del usuario
    }
  }, [loading]);

  if (loading) return null; // Muestra pantalla de carga mientras Firebase autentica

  return (
    <Stack.Navigator initialRouteName={user ? "HomeTabs" : "Login"} screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <Stack.Screen name="HomeTabs" component={BottomNavigationBar} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null; // Evita renderizar la app hasta que las fuentes estén listas

  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
