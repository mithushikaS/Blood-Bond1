 import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
 import React, {useState} from 'react';
 import Custominput from '../../Components/Custominput';
 import CustomButton from '../../Components/CustomButton';
import SocialSignInButtons from '../../Components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


 
 const ConfirmEmailScreen = () => {
  const[code,setCode]=useState('');

  const navigation=useNavigation();
 
 
  const onConfirmPressed = () => {
    const user = auth().currentUser;
    
    if (user) {
      user.reload().then(() => {
        if (user.emailVerified) {
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Email not verified. Please check your email for the verification link.');
        }
      }).catch(error => {
        Alert.alert('Error', error.message);
      });
    } else {
      Alert.alert('Error', 'User not found.');
    }
  };
 
  
  const onSignInPress= () => {
    navigation.navigate('SignIn');
  };
 
  const onResendPress = () => {
    const user = auth().currentUser;

    if (user) {
      user
        .sendEmailVerification()
        .then(() => {
          Alert.alert('Email Sent', 'A verification email has been sent.');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Error', 'User not found.');
    }
  };

     return (
      <ScrollView showsVerticalScrollIndicator={false}>

     <View style={styles.container}>
         <Text style={styles.title}>
            Confirm your email
         </Text>

         
         <CustomButton text="Confirm" 
         onPress={onConfirmPressed}
         />
         
         <CustomButton text="Resend code"
         onPress={onResendPress} 
         type="SECONDARY"
         />
         
         <CustomButton text="Back to Sign In"
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

  },
  
      title :{
        fontSize:24,
        fontWeight:'bold',
        color:'#051C60',
        margin: 10,
      },
      text:{
        color: 'gray',
        marginVertical:10,
      },
      link:{
        color:'#FDB075',
      },

 });
 
 export default ConfirmEmailScreen;             