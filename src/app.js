import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';



const Stack = createStackNavigator();

class App extends React.Component {
    render() {
        return (
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} options={{ title: 'Home Page' }} />
                        <Stack.Screen name="Login" component={Login} options={{ title: 'Login Page' }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup Page' }} />
                        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Home Page' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCC'
    },

    textInput: {
        paddingLeft: 15,
        paddingRight: 15

    }
});

export default App;