import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../screens/Chat';
import Home from '../screens/Home';
import Medicamentos from '../screens/Medicamentos';
import BodyHuman from '../screens/BodyHuman';

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icons: Record<string, string> = {
          Home: 'home',
          Medicamentos: 'pill',
          Chat: 'chat',
        };
        return {
          tabBarIcon: ({ color, size }) => (
            <Icon name={icons[route.name] ?? 'help'} size={size} color={color} />
          ),
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          },
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Medicamentos" component={Medicamentos} />
      <Tab.Screen name="Humano Prueba" component={BodyHuman} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
