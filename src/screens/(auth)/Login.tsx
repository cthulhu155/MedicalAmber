import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { sharedStyles } from "../../utils/Styles/AuthStyleSheet";

type LoginProps = {
  navigation: NavigationProp<any>;
};

export default function Login({ navigation }: LoginProps) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, introduce tu correo y contraseña.");
      return;
    }

    try {
      await login(email, password);
      Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo!");
      navigation.navigate("HomeTabs");
    } catch (error: any) {
      let errorMessage = "Correo o contraseña incorrectos. Inténtalo de nuevo.";
      
      if (error.code === "auth/invalid-email") {
        errorMessage = "El formato del correo es inválido.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No existe una cuenta con este correo.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "La contraseña es incorrecta.";
      }

      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[sharedStyles.container, { flex: 1 }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("../../../assets/images/MedicalAmber.png")} style={sharedStyles.logoImage} />
          <Text style={sharedStyles.title}>Iniciar sesión</Text>
          <Text style={sharedStyles.subtitle}>Accede a tu cuenta de forma segura.</Text>

          <TextInput
            style={sharedStyles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Correo electrónico"
          />

          <TextInput
            style={sharedStyles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            accessibilityLabel="Contraseña"
          />

          <TouchableOpacity 
            style={[sharedStyles.button, loading && { backgroundColor: "#aaa" }]} 
            onPress={handleLogin} 
            disabled={loading}
            accessibilityLabel="Iniciar sesión"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={sharedStyles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <Text 
            style={sharedStyles.link} 
            onPress={() => navigation.navigate("Register")}
            accessibilityLabel="Registrarse"
          >
            ¿Nuevo usuario? Regístrate
          </Text>

          <Text 
            style={sharedStyles.help} 
            onPress={() => Alert.alert("Ayuda", "Para más información, contacta soporte.")}
            accessibilityLabel="Ayuda"
          >
            ¿Necesitas ayuda?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
