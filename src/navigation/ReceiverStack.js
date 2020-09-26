import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRscanner from '../pages/QRscanner';
import QRscannerDR from '../pages/QRscannerDR';
import ReceiverAcceptedFood from '../pages/ReceiverAcceptedFood';
import ReceiverManageProfile from '../pages/ReceiverManageProfile';
import Verify from '../pages/Verify';
import ReceiverViewAcceptedRequest from '../pages/ReceiverViewAcceptedRequest';
import ViewPostReceiver from '../pages/ViewPostReceiver';
import ReceiverDashboard from './../pages/ReceiverDashboard';
import RequestDonation from './../pages/RequestDonation';
import RFeedback from './../pages/RFeedback';
import UpdateDonationRequest from './../pages/UpdateDonationRequest';
import ViewDonationRequest from './../pages/ViewDonationRequest';
import ChangePassword from '../pages/ChangePassword';
import ReceiverReceived from '../pages/ReceiverReceived';

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
        component={ReceiverReceived}
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
          headerShown:false
          // title: 'Receiver Page',
          // headerLeft: () => { disabled: true },
          // headerTitleAlign: 'center'
        }} />

      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '' }} />
      <Stack.Screen name="Verify" component={Verify} options={{ title: '' }} />
      <Stack.Screen name="RequestDonation" component={RequestDonation} options={{ title: '' }} />
      <Stack.Screen name="ViewDonationRequest" component={ViewDonationRequest} options={{ title: '' }} />
      <Stack.Screen name="UpdateDonationRequest" component={UpdateDonationRequest} options={{ title: '' }} />

      <Stack.Screen name="ViewPostReceiver" component={ViewPostReceiver} options={{ title: '' }} />

      <Stack.Screen name="QRscannerPage" component={QRscanner} options={{ title: '' }} />
      <Stack.Screen name="QRscannerDRPage" component={QRscannerDR} options={{ title: '' }} />
      <Stack.Screen name="ReceiverAcceptedFood" component={ReceiverAcceptedFood} options={{ title: '' }} />

      <Stack.Screen name="ReceiverViewAcceptedRequest" component={ReceiverViewAcceptedRequest} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
