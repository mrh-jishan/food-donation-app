import Geolocation from '@react-native-community/geolocation';
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
  const { user, setUser, profile, setProfile, setCoords } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      firestore().collection('Users')
        .where('email', '==', user.email).get()
        .then(snap => {
          const profile = snap.docs[0].data();
          console.log('profile: ', profile);
          setProfile(profile);
        })
    }

    if (initializing) setInitializing(false);
    setTimeout(()=>{
      setLoading(false)
    }, 3000);

    Geolocation.getCurrentPosition(info => {
      setCoords(info.coords);
    });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  const page = profile.type && profile.type == 'donor' ? <DonorStack /> : <ReceiverStack />

  return (
    <NavigationContainer>
      {user && profile ? page : <AuthStack />}
    </NavigationContainer>
  );
}
