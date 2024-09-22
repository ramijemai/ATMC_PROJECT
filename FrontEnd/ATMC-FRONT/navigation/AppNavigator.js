import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import Screen1 from '../screens/Driver/Screen1';
import Chat from '../screens/Driver/Chat';
import Header from '../components/header';
import LoginScreen from '../screens/LoginScreen';
import Route from '../screens/Driver/CommencerRoute';
import endRo from '../screens/Driver/TerminerRoute';
import MHome from '../screens/Manager/MHome';
import AssignRoute from '../screens/Manager/AssignRoute';
import ListeChaffeurs from '../screens/Manager/ListeChauffers';
import AddDriverScreen from '../screens/Manager/AddDriverScreen';
import ChatManager from '../screens/Manager/ChatManager';
import RoutesScreen from '../screens/Manager/RoutePage';

const Tab = createBottomTabNavigator();
const MTAB = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        initialParams={{ userInfo }}  // Pass userInfo to Screen1
      />
    </Stack.Navigator>
  );
};

const ChatStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Chat"
        component={Chat}
        initialParams={{ userInfo }}  // Pass userInfo to ChatScreen
      />
    </Stack.Navigator>
  );
};

const MapsStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Commencer Route"
        component={Route}
        initialParams={{ userInfo }}  // Pass userInfo to Route
      />
    </Stack.Navigator>
  );
};

const EndStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Terminer Route"
        component={endRo}
        initialParams={{ userInfo }}  // Pass userInfo to TerminerRoute
      />
    </Stack.Navigator>
  );
};

const TabNavigator = ({ route }) => {
  const { userInfo } = route.params;

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
      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ userInfo }}  // Pass userInfo to HomeStack
      />
      <Tab.Screen
        name="messages"
        component={ChatStack}
        initialParams={{ userInfo }}  // Pass userInfo to ChatStack
      />
      <Tab.Screen
        name="startR"
        component={MapsStack}
        initialParams={{ userInfo }}  // Pass userInfo to MapsStack
      />
      <Tab.Screen
        name="endR"
        component={EndStack}
        initialParams={{ userInfo }}  // Pass userInfo to EndStack
      />
    </Tab.Navigator>
  );
};
////////////////////////// MANAGER  ////////////////////////////

const ManagerHomeStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Menu"
        component={MHome}
        initialParams={{ userInfo }}  // Pass userInfo to Screen1
      />
    </Stack.Navigator>
  );
};

const MChatStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Chat"
        component={ChatManager}
        initialParams={{ userInfo }}  // Pass userInfo to ChatScreen
      />
    </Stack.Navigator>
  );
};

const MMapsStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Route"
        component={RoutesScreen}
        initialParams={{ userInfo }}  // Pass userInfo to Route
      />
    </Stack.Navigator>
  );
};


const MEndStack = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Liste des chauffeurs"
        component={ListeChaffeurs}
        initialParams={{ userInfo }}  // Pass userInfo to TerminerRoute
      />
    </Stack.Navigator>
  );
};

const MTabNavigator = ({ route }) => {
  const { userInfo } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chat') {
            iconName = 'comments';
          } else if (route.name === 'Routes') {
            iconName = 'truck';
          } else if (route.name === 'Liste des chauffeurs') {
            iconName = 'user';
          }
          else if (route.name === 'Ajouter Chauffeur') {
            iconName = 'user-plus';
          }
          else if (route.name === 'Add Route') {
            iconName = 'folder-plus';
          }
          
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#ccc',
      })}
    >
      <Tab.Screen
        name="Home"
        component={ManagerHomeStack}
        initialParams={{ userInfo }}  // Pass userInfo to HomeStack
      />
      
      <Tab.Screen
        name="Routes"
        component={RoutesScreen}
        initialParams={{ userInfo }}  // Pass userInfo to MapsStack
      />
      <Tab.Screen
        name="Add Route"
        component={AssignRoute}
        initialParams={{ userInfo }}  // Pass userInfo to MapsStack
      />
      <Tab.Screen
        name="Chat"
        component={ChatManager}
        initialParams={{ userInfo }}  // Pass userInfo to EndStack
      />
      <Tab.Screen
        name="Liste des chauffeurs"
        component={ListeChaffeurs}
        initialParams={{ userInfo }}  // Pass userInfo to ChatStack
      />
<Tab.Screen
        name="Ajouter Chauffeur"
        component={AddDriverScreen}
        initialParams={{ userInfo }}  // Pass userInfo to EndStack

      />

    </Tab.Navigator>
  );
};





const AppNavigator = () => {
  return (
    <NavigationContainer>
     <Header />
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MTAB" component={MTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
