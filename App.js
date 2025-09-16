import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './styles/ThemeContext';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ReviewScreen from './screens/ReviewScreen';
import ErrorBoundary from './components/ErrorBoundary';

const Tab = createBottomTabNavigator();

function ThemedNavigator() {
  const { theme, mode } = useTheme();
  const [ready, setReady] = useState(true);
  const navTheme = useMemo(() => {
    const base = mode === 'dark' ? NavDarkTheme : NavDefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: theme.colors.background,
        border: theme.colors.border,
        card: theme.colors.surface || theme.colors.background,
        primary: theme.colors.primary,
        text: theme.colors.text,
        notification: theme.colors.primary,
      },
      fonts: base.fonts || { regular: { fontFamily: 'System', fontWeight: '400' }, medium: { fontFamily: 'System', fontWeight: '500' }, bold: { fontFamily: 'System', fontWeight: '700' }, heavy: { fontFamily: 'System', fontWeight: '800' } },
    };
  }, [theme, mode]);

  if (!ready) {
    return (
      <>
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      </>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.colors.surfaceAlt || theme.colors.background, borderTopColor: theme.colors.border },
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';
            if (route.name === 'Hjem') iconName = 'home';
            else if (route.name === 'Søg') iconName = 'search';
            else if (route.name === 'Reviews') iconName = 'chatbubbles';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
        })}
      >
        <Tab.Screen name="Hjem" component={HomeScreen} />
        <Tab.Screen name="Søg" component={SearchScreen} />
        <Tab.Screen name="Reviews" component={ReviewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ThemedNavigator />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
