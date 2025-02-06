import React, { useState } from 'react';
import { View,Image, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Inicio de sesión exitoso', 'Bienvenido de nuevo!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Por favor, introduce tu correo y contraseña.');
    }
  };

  return (
    <View style={styles.container}>

      <Image source={require('../../assets/images/MedicalAmber.png')} style={styles.logoImage}/>

      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Accede a tu cuenta de forma segura.</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.emailButton} onPress={handleLogin}>
        <Text style={styles.emailButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿Nuevo usuario? Regístrate
      </Text>

      <Text style={styles.help} onPress={() => Alert.alert('Ayuda', 'Para más información, contacta soporte.')}>¿Necesitas ayuda?</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2632',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  emailButton: {
    backgroundColor: '#FF9AA2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#FF9AA2',
    marginTop: 10,
  },
  help: {
    color: '#ccc',
    marginTop: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Esto hace que la imagen sea circular
    alignSelf: 'center',
    marginTop: 10, // Ajusta este valor según sea necesario para posicionarla arriba
    marginBottom: 20,
  },

});