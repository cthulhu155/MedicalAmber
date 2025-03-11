import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useReminders } from "./hooks/useReminders";
import Login from "../src/screens/(auth)/Login";
import Register from "../src/screens/(auth)/Register";
import NavigationBar from "./components/NavigationBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { scheduleOneTimeNotification } from "../src/utils/config/NotificationService";

// Configuración de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Evita que la pantalla de carga desaparezca antes de que la app esté lista
SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, loading } = useAuth();

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
    <Stack.Navigator
      initialRouteName={user ? "HomeTabs" : "Login"}
      screenOptions={{ headerShown: false }}
    >
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

// Componente para manejar los listeners de notificaciones y reprogamar la siguiente notificación
function AppContent() {
  // Extraemos 'reminders' y 'updateReminderTime' de nuestro hook useReminders
  const { reminders, updateReminderTime } = useReminders();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("No se han otorgado permisos para las notificaciones");
        return;
      }
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.NONE,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    registerForPushNotificationsAsync();

    // Listener para notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log("Notificación recibida:", notification);

        // Extrae la data de la notificación
        const data = notification.request.content.data;
        const intervalHours = data.intervalHours || 0;
        const reminderId = data.reminderId || "";

        // Verifica que el recordatorio aún exista en el estado
        const reminderExists = reminders.find((r) => r.id === reminderId);
        if (!reminderExists) {
          console.log("El recordatorio fue eliminado; no se reprogra notificación");
          return;
        }

        if (intervalHours > 0 && reminderId) {
          const now = new Date();
          // Calcula la próxima hora sumando 'intervalHours' a la hora actual
          const nextDate = new Date(now.getTime() + intervalHours * 3600 * 1000);

          // Programa la siguiente notificación y obtiene el nuevo notificationId
          const newNotificationId = await scheduleOneTimeNotification(
            "Recordatorio de medicamento",
            `Siguiente toma (cada ${intervalHours} hrs)`,
            nextDate,
            reminderId,
            intervalHours
          );

          // Actualiza el recordatorio en la BD y en el estado local
          await updateReminderTime(reminderId, nextDate.toISOString(), newNotificationId);
        }
      }
    );

    // Listener para respuesta a notificaciones (cuando el usuario toca la notificación)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Respuesta a la notificación:", response);
        // Aquí podrías navegar a una pantalla de detalles, etc.
      }
    );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [reminders, updateReminderTime]);

  return null;
}

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <AuthProvider>
      {/* AppContent maneja los listeners y la reprogramación de notificaciones */}
      <AppContent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
