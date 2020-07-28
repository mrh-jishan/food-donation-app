import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Contact from './pages/RFeedback';
import DonorDashboard from './pages/DonorDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import PostFood from './pages/PostFood';
import ReceiverDashboard from './pages/ReceiverDashboard';
import RequestDonation from './pages/RequestDonation';
import RFeedback from './pages/RFeedback';
import DFeedback from './pages/DFeedback';

const Tab = createBottomTabNavigator();

const DonorTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="DonorDashboard"
            tabBarOptions={{
                activeTintColor: "#008B8B",
                inactiveTintColor: "#2F4F4F",
                labelStyle: {
                    fontSize: 15,
                    margin: 0,
                    padding: 0,
                },
                style: {
                    backgroundColor: "#DCDCDC",
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
                name="DFeedback"
                component={DFeedback}
                options={{
                    tabBarLabel: 'Feedback',
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
            initialRouteName="ReceiverDashboard"
            tabBarOptions={{
                activeTintColor: "#008B8B",
                inactiveTintColor: "#2F4F4F",
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
                name="ReceiverDashboard"
                component={ReceiverDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={20} />
                    ),
                }}
            />

            <Tab.Screen
                name="ReceivedList"
                component={DonorDashboard}
                options={{
                    tabBarLabel: 'Received',
                    tabBarIcon: ({ color }) => (
                        <Icon name="yelp" color={color} size={20} />
                    ),
                }}
            />


            <Tab.Screen
                name="RFeedback"
                component={RFeedback}
                options={{
                    tabBarLabel: 'Feedback',
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
                        <Stack.Screen name="RequestDonation" component={RequestDonation} options={{ title: 'Request Donation' }} />
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