import React from 'react';
import { Text, View } from 'react-native';
import GuestNavigation from './application/navigations/guest';
import firebaseConfig from './application/utils/firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

export default function App() {

  return (
    <GuestNavigation />
  );
}
