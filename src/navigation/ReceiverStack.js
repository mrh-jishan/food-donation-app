import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DonorDashboard from './../pages/DonorDashboard';
import ReceiverManageProfile from '../pages/ReceiverManageProfile';
import ReceiverVerify from '../pages/ReceiverVerify';
import ReceiverDashboard from './../pages/ReceiverDashboard';
import RequestDonation from './../pages/RequestDonation';
import RFeedback from './../pages/RFeedback';
import ViewDonationRequest from './../pages/ViewDonationRequest';
import UpdateDonationRequest from './../pages/UpdateDonationRequest';
import ViewPostReceiver from '../pages/ViewPostReceiver';
import ReceiverAcceptedFood from '../pages/ReceiverAcceptedFood';
import ReceiverViewAcceptedRequest from '../pages/ReceiverViewAcceptedRequest';
import QRscanner from '../pages/QRscanner';
import QRscannerDR from '../pages/QRscannerDR';

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
        component={ReceiverAcceptedFood}
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
        component={ReceiverManageProfile}
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

      <Stack.Screen name="ReceiverVerify" component={ReceiverVerify} options={{ title: 'Receiver Verify' }} />
      <Stack.Screen name="RequestDonation" component={RequestDonation} options={{ title: 'Request Donation' }} />
      <Stack.Screen name="ViewDonationRequest" component={ViewDonationRequest} options={{ title: 'View Requested Donation' }} />
      <Stack.Screen name="UpdateDonationRequest" component={UpdateDonationRequest} options={{ title: 'Update Requested Donation' }} />
      
      <Stack.Screen name="ViewPostReceiver" component={ViewPostReceiver} options={{ title: 'View Posted Receiver' }} />

      <Stack.Screen name="QRscannerPage" component={QRscanner} options={{ title: 'Scan QR Code' }} />
      <Stack.Screen name="QRscannerDRPage" component={QRscannerDR} options={{ title: 'Scan QR Code' }} />

      <Stack.Screen name="ReceiverAcceptedFood" component={ReceiverAcceptedFood} options={{ title: 'Receiver Accepted Food' }} />
      
      <Stack.Screen name="ReceiverViewAcceptedRequest" component={ReceiverViewAcceptedRequest} options={{ title: 'Receiver View Accepted Request' }} />
    </Stack.Navigator>
  );
}
