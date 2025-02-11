import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { sharedStyles } from "../../utils/StyleSheetAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/config/firebase.config";
import { useAuth } from "../../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RegisterProps {
  navigation: any;
}

export default function Register({ navigation }: RegisterProps) {
  const { user } = useAuth(); // Accede al estado del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // Imprimir los valores de email y password en la consola
  // console.log("Datos enviados a Firebase:");
  // console.log("Email:", email);
  // console.log("Contraseña:", password);

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
      Alert.alert("Éxito", "Usuario registrado exitosamente.");
      
      // Lo estoy forzando xD aun no encuentro otra fora 
      if (navigation && navigation.navigate) {
      navigation.navigate("HomeTabs");
      } else {
        console.error("Error: Navigation no está definido.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.title}>Registro</Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={sharedStyles.button} onPress={handleRegister} disabled={loading}>
        <Text style={sharedStyles.buttonText}>{loading ? "Registrando..." : "Registrarse"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={sharedStyles.link}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  );
}
