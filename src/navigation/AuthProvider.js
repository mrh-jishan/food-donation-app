import auth from '@react-native-firebase/auth';
import React, { createContext, useState } from 'react';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        coords,
        setCoords,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
