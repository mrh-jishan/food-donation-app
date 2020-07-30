import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DonorDashboard from './../pages/DonorDashboard';
import Profile from './../pages/Profile';
import ReceiverDashboard from './../pages/ReceiverDashboard';
import RequestDonation from './../pages/RequestDonation';
import RFeedback from './../pages/RFeedback';

const Tab = createBottomTabNavigator();

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

export default function ReceiverStack() {
  return (
    <Stack.Navigator initialRouteName='Receiver'>
      <Stack.Screen
        name="Receiver"
        component={ReceiverTabs}
        options={{
          title: 'Receiver Page',
          headerLeft: () => { disabled: true },
          headerTitleAlign: 'center'
        }} />

      <Stack.Screen name="RequestDonation" component={RequestDonation} options={{ title: 'Request Donation' }} />

    </Stack.Navigator>
  );
}
