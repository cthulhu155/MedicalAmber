import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

// IMPLEMENTARO EN MEDICAMENTOS.TSX /SCREENS/MEDICAMENTOS.TSX
const AddMedicineScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Medicine Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Schedule"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Medicine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AlarmScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Alarms</Text>
      {/* Alarm list will be implemented here */}
    </View>
  );
};

export default function BottomAddMedicine() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Add Medicine') {
            iconName = 'pill';
          } else if (route.name === 'Alarms') {
            iconName = 'alarm';
          }

          return <Icon name={iconName || 'help'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6C63FF',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
        }
      })}
    >
      <Tab.Screen name="Add Medicine" component={AddMedicineScreen} />
      <Tab.Screen name="Alarms" component={AlarmScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
