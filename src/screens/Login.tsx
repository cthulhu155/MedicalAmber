import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={require('./utils/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>My App</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
          
      </TouchableOpacity>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton, styles.facebook]}>
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.twitter]}>
          <Text style={styles.socialText}>Twitter</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  facebook: {
    backgroundColor: '#3b5998',
  },
  twitter: {
    backgroundColor: '#1da1f2',
  },
  socialText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
