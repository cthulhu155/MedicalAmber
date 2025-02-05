import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../utils/StyleSheet';


export default function Register() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bienvenido al Register!</Text>
      <StatusBar style="auto" />
    </View>
  );
}