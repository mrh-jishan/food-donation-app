import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './../pages/Login';
import Signup from './../pages/Signup';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login Page' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup Page' }} />
    </Stack.Navigator>
  );
}
