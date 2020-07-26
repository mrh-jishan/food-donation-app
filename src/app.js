import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contact from './pages/Contact';
import DonorDashboard from './pages/DonorDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import PostFood from './pages/PostFood';


const Tab = createBottomTabNavigator();

const DonorTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="DonorDashboard"
            tabBarOptions={{
                activeTintColor: "#7444C0",
                inactiveTintColor: "#363636",
                labelStyle: {
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                },
                style: {
                    backgroundColor: "#DDD",
                    borderTopWidth: 0,
                    marginBottom: 0,
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    shadowColor: "#CCC",
                    shadowOffset: { height: 0, width: 0 }
                }
            }}
        >
            <Tab.Screen
                name="DonorDashboard"
                component={DonorDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={20} />
                    ),
                }}
            />

            <Tab.Screen
                name="DonationList"
                component={DonorDashboard}
                options={{
                    tabBarLabel: 'Donation',
                    tabBarIcon: ({ color }) => (
                        <Icon name="yelp" color={color} size={20} />
                    ),
                }}
            />


            <Tab.Screen
                name="Contact"
                component={Contact}
                options={{
                    tabBarLabel: 'Contact',
                    tabBarIcon: ({ color }) => (
                        <Icon name="address-card" color={color} size={20} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-o" color={color} size={20} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
}


const ReceiverTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="DonorDashboard"
            tabBarOptions={{
                activeTintColor: "#7444C0",
                inactiveTintColor: "#363636",
                labelStyle: {
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                },
                style: {
                    backgroundColor: "#DDD",
                    borderTopWidth: 0,
                    marginBottom: 0,
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    shadowColor: "#CCC",
                    shadowOffset: { height: 0, width: 0 }
                }
            }}
        >
            <Tab.Screen
                name="DonorDashboard"
                component={DonorDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={20} />
                    ),
                }}
            />

            <Tab.Screen
                name="DonationList"
                component={DonorDashboard}
                options={{
                    tabBarLabel: 'Donation',
                    tabBarIcon: ({ color }) => (
                        <Icon name="yelp" color={color} size={20} />
                    ),
                }}
            />


            <Tab.Screen
                name="Contact"
                component={Contact}
                options={{
                    tabBarLabel: 'Contact',
                    tabBarIcon: ({ color }) => (
                        <Icon name="address-card" color={color} size={20} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="user-o" color={color} size={20} />
                    ),
                }}
            />


        </Tab.Navigator>
    );
}

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

                        <Stack.Screen
                            name="Donor"
                            component={DonorTabs}
                            options={{
                                title: 'Donor Page',
                                headerLeft: () => { disabled: true },
                                headerTitleAlign: 'center'
                            }} />

                        <Stack.Screen
                            name="Receiver"
                            component={ReceiverTabs}
                            options={{
                                title: 'Receiver Page',
                                headerLeft: () => { disabled: true },
                                headerTitleAlign: 'center'
                            }} />


                        <Stack.Screen name="PostFood" component={PostFood} options={{ title: 'Post Food' }} />
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