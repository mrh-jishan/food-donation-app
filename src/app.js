import React from 'react'
import {View,Text, Button, TextInput, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Home from './pages/Home'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login'
import Register from './pages/Register';
import Signup from './pages/Signup'

const Stack = createStackNavigator();

class App extends React.Component{
    render(){
        return(
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen  name="Home" component={Home} options={{ title: 'Home Page' }}  />
              <Stack.Screen  name="Login" component={Login} options={{ title: 'Login Page' }}  />
              <Stack.Screen  name="Signup" component={Signup} options={{ title: 'Signup Page' }}  />
            </Stack.Navigator>
          </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#CCC'
    },

    textInput: {
        paddingLeft: 15,
        paddingRight: 15

    }
});

export default App;