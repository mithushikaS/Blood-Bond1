import { View, Text } from 'react-native'
import { Alert } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

    const SocialSignInButtons = () => {
      const onSignInGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);
          Alert.alert('Success', 'Signed in with Google!');
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Cancelled', 'User cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert('In Progress', 'Sign in is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Error', 'Play services not available or outdated');
          } else {
            Alert.alert('Error', error.message);
          }
        }
      };
    

  return (
    <>
       <CustomButton
         text="Sign In with Google"
         onPress={onSignInGoogle}
         bgColor="#FAE9EA"
         FgColor="#DD4D44"
         />
    </>
  );
};

export default SocialSignInButtons;