import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../pages/Home';
import Login from './../pages/Login';
import Signup from './../pages/Signup';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login Page' }} />
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home Page' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup Page' }} />
    </Stack.Navigator>
  );
}
