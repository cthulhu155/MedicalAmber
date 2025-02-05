import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from '../src/screens/Home'; // Importa el componente Home

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home /> {/* Usa el componente Home aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});