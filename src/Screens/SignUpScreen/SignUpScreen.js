 import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
 import React, {useState} from 'react';
 import Custominput from '../../Components/Custominput';
 import CustomButton from '../../Components/CustomButton';
import SocialSignInButtons from '../../Components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

 
 const SignUpScreen = () => {
  const [username, setUsername]=useState('');
  const[email,setEmail]=useState('');
  const [password, setPassword]=useState('');
  const[passwordRepeat,setPasswordRepeat]=useState('');


  const navigation = useNavigation();
 
 
  const onRegisterPressed = () => {
    if (!username || !email || !password || !passwordRepeat) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== passwordRepeat) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // Add user to Firestore
        const userData = {
          username,
          email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        const signupData = {
          username,
          email,
          password, // Store password only if necessary and consider encrypting it
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        firestore()
          .collection('users')
          .doc(user.uid)
          .set(userData)
          .then(() => {
            firestore()
              .collection('signupData')
              .add(signupData)
              .then(() => {
                user.sendEmailVerification().then(() => {
                  Alert.alert('Email Sent', 'A verification email has been sent to your email address.');
                  navigation.navigate('ConfirmEmail');
                });
              })
              .catch(error => {
                Alert.alert('Error', error.message);
              });
          })
          .catch(error => {
            Alert.alert('Error', error.message);
          });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  }

 
  
  const onSignInPress= () => {
    navigation.navigate('SignIn');
  };
  const onTermsOfUsePressed =() => {
    console.warn('onTermsOfUsePressed');
  };
  const onPrivacyPolicyPressed =() => {
    console.warn('onPrivacyPolicyPressed');
  };
  const onSignInGoogle =() => {
    console.warn('Sign In Google');
  };
     return (
      <ScrollView showsVerticalScrollIndicator={false}>

     <View style={styles.container}>
         <Text style={styles.title}>
            Create an account
         </Text>

         <Custominput placeholder='Username' 
         value={username} 
         setValue={setUsername}
         />
         <Custominput  placeholder='Email' 
         value={email} 
         setValue={setEmail}
         />
         <Custominput  placeholder='Password' 
         value={password} 
         setValue={setPassword}
         secureTextEntry={true}
         />
         <Custominput  placeholder='Confirm Password' 
         value={passwordRepeat} 
         setValue={setPasswordRepeat}
         secureTextEntry={true}
         />


         <CustomButton text="Register" 
         onPress={onRegisterPressed}
         />
         <Text style={styles.text}>
          By registering, you confirm that you accept our {''}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>{''} and {''}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
         </Text>
         <SocialSignInButtons/>
        
         
         <CustomButton text="Have an account? Sign In"
         onPress={onSignInPress} 
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
    marginVertical:50,

  },
  
      title :{
        fontSize:24,
        fontWeight:'bold',
        color:'#6b0711',
        margin: 35,
      },
      text:{
        color: 'gray',
        marginVertical:10,
      },
      link:{
        color:'#FDB075',
      },

 });
 
 export default SignUpScreen;             
 