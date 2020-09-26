import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangePassword from '../pages/ChangePassword';
import DonationList from '../pages/DonationList';
import DFeedback from './../pages/DFeedback';
import DonorAcceptedRequest from './../pages/DonorAcceptedRequest';
import DonorDashboard from './../pages/DonorDashboard';
import DonorManageProfile from './../pages/DonorManageProfile';
import DonorViewAcceptedPost from './../pages/DonorViewAcceptedPost';
import DonorViewNearestHome from './../pages/DonorViewNearestHome';
import PostFood from './../pages/PostFood';
import UpdateFood from './../pages/UpdateFood';
import ViewDonationRequestDonor from './../pages/ViewDonationRequestDonor';
import ViewPostedFood from './../pages/ViewPostedFood';
import Verify from '../pages/Verify';
import DonorDonated from '../pages/DonorDonated';

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
        component={DonorDonated}
        options={{
          tabBarLabel: 'Donated',
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
        component={DonorManageProfile}
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

export default function DonorStack() {
  return (
    <Stack.Navigator initialRouteName='Donor'>
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: '' }} />
      <Stack.Screen name="Donor" component={DonorTabs} options={{ title: '', headerLeft: () => { disabled: true }, headerTitleAlign: 'center' }} />
      <Stack.Screen name="PostFood" component={PostFood} options={{ title: '' }} />
      <Stack.Screen name="ViewPostedFood" component={ViewPostedFood} options={{ title: '' }} />
      <Stack.Screen name="UpdateFood" component={UpdateFood} options={{ title: '' }} />

      <Stack.Screen name="Verify" component={Verify} options={{ title: '' }} />
      <Stack.Screen name="ViewDonationRequestDonor" component={ViewDonationRequestDonor} options={{ title: '' }} />
      <Stack.Screen name="DonorAcceptedRequest" component={DonorAcceptedRequest} options={{ title: '' }} />
      <Stack.Screen name="DonorViewAcceptedPost" component={DonorViewAcceptedPost} options={{ title: '' }} />
      <Stack.Screen name="DonorViewNearestHome" component={DonorViewNearestHome} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
