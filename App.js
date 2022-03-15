import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ title: 'TeamPro',  headerStyle: {
            backgroundColor: '#002E27',
          },
          headerTintColor: '#E8E8E8',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: "normal normal normal 16px/21px DM Sans",
          } }} name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
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
