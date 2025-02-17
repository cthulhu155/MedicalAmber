import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import Home from '../screens/Home';
import Medicamentos from '../screens/Medicamentos';
import BodyHuman from '../screens/BodyHuman';
// Configuración centralizada en un archivo aparte
import { TAB_BAR_STYLE, TAB_ICONS } from '../hooks/navigationConfig';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  // Memoizar la configuración de las pantallas para mejorar performance
  const screenConfig = useMemo(() => [
    { name: 'Home', component: Home },
    { name: 'Medicamentos', component: Medicamentos },
    { name: 'Cuerpo', component: BodyHuman },
  ], []);

  const renderTabBarIcon = (route: keyof typeof TAB_ICONS, color: string, size: number) => (
    <Icon name={TAB_ICONS[route]} size={size} color={color} />
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => renderTabBarIcon(route.name as keyof typeof TAB_ICONS, color, size),
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: TAB_BAR_STYLE,
        headerShown: false,
      })}
    >
      {screenConfig.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
};

export default NavigationBar;
