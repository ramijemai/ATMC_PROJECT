import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import Screen1 from '../screens/Driver/Screen1';
import Chat  from '../screens/Driver/Chat';
import LoginScreen from '../screens/LoginScreen';
import Header from '../components/header';
import Route from '../screens/Driver/CommencerRoute';
import endRo from '../screens/Driver/TerminerRoute';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen1" component={Screen1} />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const MapsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Commencer Route" component={Route} />
    </Stack.Navigator>
  );
};
const EndStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Terminer Route" component={endRo} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'messages') {
            iconName = 'comments';
          } else if (route.name === 'startR') {
            iconName = 'truck';
          } else if (route.name === 'endR') {
            iconName = 'map-pin';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#ccc',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="messages" component={ChatStack} />
      <Tab.Screen name="startR" component={MapsStack} />
      <Tab.Screen name="endR" component={EndStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;