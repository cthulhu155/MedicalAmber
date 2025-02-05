import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationIndependentTree } from '@react-navigation/native';


import _layout from '../app/(tabs)/_layout';        
import Login from '../app/screen/login';
import registro from './screen/registro';

// Evitar que se oculte la pantalla de splash automáticamente
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  // Cargar la fuente personalizada
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Estado de autenticación (ejemplo)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Wrapper para el componente Login que pasa la función setIsAuthenticated
  function LoginWrapper(props: any) {
    return <Login {...props} setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
<NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="_layout" component={_layout} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginWrapper} />
            <Stack.Screen name="Register" component={registro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
</NavigationIndependentTree>

  );
}