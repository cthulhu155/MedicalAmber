import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../../utils/StyleSheetAuth'; 
interface RegisterProps {
  navigation: any; 
}

export default function Register({ navigation }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Validar que se hayan completado todos los campos
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    Alert.alert('Éxito', 'Usuario registrado exitosamente.');
    
      navigation.navigate('Login');
  };

  return (
   <View style={sharedStyles.container}>
      <Text style={sharedStyles.title}>Registro</Text>

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#ccc"
        style={sharedStyles.input}
        value={username}
        onChangeText={setUsername}
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

      <TouchableOpacity style={sharedStyles.button} onPress={handleRegister}>
        <Text style={sharedStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={sharedStyles.link}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  );
}
