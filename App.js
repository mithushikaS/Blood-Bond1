import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import Navigation from './src/Navigation';
import axios from 'axios';
import * as Linking from 'expo-linking';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import messaging from '@react-native-firebase/messaging';
import { firebase } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBDF1EKHqdSYu76D9GhThtutK0StEyC3fo",
  authDomain: "otpauthapp-9ed7d.firebaseapp.com",
  projectId: "otpauthapp-9ed7d",
  storageBucket: "otpauthapp-9ed7d.appspot.com",
  messagingSenderId: "731240131076",
  appId: "1:731240131076:android:644755e03fd5e4b10ea351"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { auth, firestore, storage };

export default function App() {
  const [donorId, setDonorId] = useState('');
  const [eligibility, setEligibility] = useState(null);

  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  // Configure Google Sign-In
  GoogleSignin.configure({
    webClientId: '731240131076-cqnnhi7kdldm71gg3k725llm52i16jbd.apps.googleusercontent.com',
  });

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    // Save the token to Firestore or send it to your server
  };

  const checkEligibility = async () => {
    try {
      let response = await axios.post('http://localhost:5000/check-eligibility', {
        donor_id: donorId
      });
      setEligibility(response.data.eligible);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
