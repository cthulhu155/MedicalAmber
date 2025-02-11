import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import Home from '../screens/Home';
import Medicamentos from '../screens/Medicamentos';
import BodyHuman from '../screens/BodyHuman';
import Asistente from '../screens/Asistente';

// Constants
const Tab = createBottomTabNavigator();

// Tab icons configuration
const TAB_ICONS: Record<string, string> = {
  Home: 'home',
  Medicamentos: 'pill',
  Cuerpo: 'human',
  Asistente: 'robot',
};

// Tab bar style configuration
const TAB_BAR_STYLE = {
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
};

// Screen configuration
const SCREEN_CONFIG = [
  { name: 'Home', component: Home },
  { name: 'Medicamentos', component: Medicamentos },
  { name: 'Cuerpo', component: BodyHuman },
  { name: 'Asistente', component: Asistente },
];

const BottomNavigationBar = () => {
  const renderTabBarIcon = (route: string, color: string, size: number) => (
    <Icon name={TAB_ICONS[route] ?? 'help'} size={size} color={color} />
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => renderTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: TAB_BAR_STYLE,
        headerShown: false,
      })}
    >
      {SCREEN_CONFIG.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
