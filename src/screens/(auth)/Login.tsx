import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { sharedStyles } from "../../utils/StyleSheetAuth"; 
import { useAuth } from "../../hooks/useAuth";

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
  //   
  // console.log("Datos enviados a Firebase:");
  // console.log("Email:", email);
  // console.log("Contraseña:", password);
    try {
      await login(email, password);
      setTimeout(() => {
        Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo!");
      navigation.navigate("HomeTabs");
      }, 500); // Retraso evitar pantalla negra
    } catch (error) {
      Alert.alert("Error", "Correo o contraseña incorrectos. Inténtalo de nuevo.");
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
          />

          <TextInput
            style={sharedStyles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={sharedStyles.button} onPress={handleLogin} disabled={loading}>
            <Text style={sharedStyles.buttonText}>{loading ? "Cargando..." : "Iniciar sesión"}</Text>
          </TouchableOpacity>

          <Text style={sharedStyles.link} onPress={() => navigation.navigate("Register")}>
            ¿Nuevo usuario? Regístrate
          </Text>

          <Text style={sharedStyles.help} onPress={() => Alert.alert("Ayuda", "Para más información, contacta soporte.")}>
            ¿Necesitas ayuda?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
