import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AddMedicineScreen = () => {
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    schedule: ''
  });

  const handleSubmit = () => {
    console.log('Medicine data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formContainer}>
            <Text style={styles.label}>Información del Medicamento</Text>
            
            <View style={styles.inputContainer}>
              <Icon name="pill" size={24} color="#6C63FF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre del Medicamento"
                placeholderTextColor="#666"
                value={formData.medicineName}
                onChangeText={(text) => setFormData(prev => ({ ...prev, medicineName: text }))}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="medical-bag" size={24} color="#6C63FF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Dosis"
                placeholderTextColor="#666"
                value={formData.dosage}
                onChangeText={(text) => setFormData(prev => ({ ...prev, dosage: text }))}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="clock-outline" size={24} color="#6C63FF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Horario"
                placeholderTextColor="#666"
                value={formData.schedule}
                onChangeText={(text) => setFormData(prev => ({ ...prev, schedule: text }))}
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleSubmit}
            >
              <Icon name="plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Agregar Medicamento</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const AlarmScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Alarmas</Text>
      {/* Aquí irán las alarmas */}
    </View>
  );
};

export default function BottomAddMedicine() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Agregar' ? 'pill' : 'alarm';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        }
      })}
    >
      <Tab.Screen name="Agregar" component={AddMedicineScreen} />
      <Tab.Screen name="Alarmas" component={AlarmScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});
