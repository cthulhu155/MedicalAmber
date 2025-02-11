import React, { useState } from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { sharedStyles } from '../../utils/StyleSheetAuth'; 

type LoginProps = {
  navigation: NavigationProp<any>; 
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Agregar esta prop
};

export default function Login({ navigation, setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Inicio de sesión exitoso', 'Bienvenido de nuevo!');
      setIsAuthenticated(true); // Marcar al usuario como autenticado
    } else {
      Alert.alert('Error', 'Por favor, introduce tu correo y contraseña.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[sharedStyles.container, { flex: 1 }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../../assets/images/MedicalAmber.png')} style={sharedStyles.logoImage} />

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

          <TouchableOpacity style={sharedStyles.button} onPress={handleLogin}>
            <Text style={sharedStyles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={sharedStyles.link} onPress={() => navigation.navigate('Register')}>
            ¿Nuevo usuario? Regístrate
          </Text>

          <Text style={sharedStyles.help} onPress={() => Alert.alert('Ayuda', 'Para más información, contacta soporte.')}>
            ¿Necesitas ayuda?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}