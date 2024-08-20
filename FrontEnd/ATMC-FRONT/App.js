import { StatusBar } from 'expo-status-bar';
import React ,{ useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';


SplashScreen.preventAutoHideAsync()
export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // Do some tasks, like loading resources or fetching data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a task
      SplashScreen.hideAsync(); // Hides the splash screen when tasks are complete
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
