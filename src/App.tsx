import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationIndependentTree } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';

// Evitar que se oculte la pantalla de splash automáticamente
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
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
            <Stack.Screen name="Home" component={Home} />

        ) : (
          <>
            <Stack.Screen name="Login" component={LoginWrapper} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
</NavigationIndependentTree>

  );
}