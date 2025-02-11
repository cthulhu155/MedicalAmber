import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { sharedStyles } from "../../utils/Styles/AuthStyleSheet";
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
      Alert.alert("Error", "Por favor, completa todos los campos.");
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

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
      Alert.alert("Éxito", "Usuario registrado exitosamente.");
      
      if (navigation) {
        navigation.navigate("HomeTabs");
      }
    } catch (error: any) {
      let errorMessage = "No se pudo completar el registro.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "El correo electrónico ya está en uso.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "El formato del correo es inválido.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil.";
      }

      Alert.alert("Error", errorMessage);
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
        accessibilityLabel="Correo electrónico"
      />
      
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Contraseña"
      />
      
      <TextInput
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        accessibilityLabel="Confirmar Contraseña"
      />

      <TouchableOpacity 
        style={[sharedStyles.button, loading && { backgroundColor: "#aaa" }]} 
        onPress={handleRegister} 
        disabled={loading}
        accessibilityLabel="Registrarse"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={sharedStyles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Volver al login">
        <Text style={sharedStyles.link}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  );
}
