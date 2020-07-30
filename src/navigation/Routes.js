import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import DonorStack from './DonorStack';
import ReceiverStack from './ReceiverStack';


export default function Routes() {
  const { user, setUser, profile, setProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      firestore().collection('Users')
        .where('email', '==', user.email).get()
        .then(snap => {
          const profile = snap.docs[0].data();
          setProfile(profile);
        })
    }
    if (initializing) setInitializing(false);
    setLoading(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user && profile && profile.type ? profile.type = 'donor' ? <DonorStack /> : <ReceiverStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
