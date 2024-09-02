import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import AppNavigator from './navigation/AppNavigator';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // Simulate loading resources or fetching data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a task
      SplashScreen.hideAsync(); // Hide the splash screen when tasks are complete
    };

    prepare();
  }, []);

  return (
      <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});