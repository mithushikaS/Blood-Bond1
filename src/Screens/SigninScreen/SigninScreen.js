 import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView,Alert } from 'react-native';
 import React, {useState, useEffect } from 'react';
 import Logo from '../../../assets/images/BloodBond.png';
 import Custominput from '../../Components/Custominput';
 import CustomButton from '../../Components/CustomButton';
import SocialSignInButtons from '../../Components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

 
 const SigninScreen = () => {
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');

  const {height}= useWindowDimensions();
  const navigation= useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '731240131076-cqnnhi7kdldm71gg3k725llm52i16jbd.apps.googleusercontent.com', // Use the web client ID generated in your Google Cloud Console
    });
  }, []);

 
  const onSignInPressed = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter both username and password.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(username, password)
      .then(userCredential => {
        const user = userCredential.user;

        const signInData = {
          userId: user.uid,
          email: user.email,
          lastSignInTime: firestore.FieldValue.serverTimestamp(),
        };

        firestore()
          .collection('signin')
          .add(signInData)
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(error => {
            Alert.alert('Error', `Sign-in successful but failed to log sign-in data: ${error.message}`);
          });
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          Alert.alert('Invalid Credentials', 'The username or password is incorrect.');
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };


  
  const onForgotPasswordPressed= () => {
   navigation.navigate('ForgotPassword');

  };
 
  const onSignUpPress = () => {
        navigation.navigate('SignUp');
  };
     return (
      <ScrollView showsVerticalScrollIndicator={false}>

     <View style={styles.container}>
         <Image source={Logo} 
         style={[styles.logo, 
         {height: height*0.3}]} 
         resizeMode="contain" 
         />

         <Custominput placeholder='Email' 
         value={username} 
         setValue={setUsername}
         />
         
         <Custominput  placeholder='Password' 
         value={password} 
         setValue={setPassword}
         secureTextEntry={true}
         />
         <CustomButton text="Sign In" 
         onPress={onSignInPressed}
         
         />
         <CustomButton text="Forgot Password?"
         onPress={onForgotPasswordPressed} 
         type="TERTIARY"
         
         />
         <SocialSignInButtons />
         <CustomButton text="Don't have an account? Create one"
         onPress={onSignUpPress} 
         type="TERTIARY"
         
         />
     </View>
     </ScrollView>
   );
 };

 const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding:20,


    margin: 20,

  },
  
    logo: {
        width: '80%',
        maxWidth:300,
        maxHeight: 280,
        margin:40,
      },

 });
 
 export default SigninScreen;             