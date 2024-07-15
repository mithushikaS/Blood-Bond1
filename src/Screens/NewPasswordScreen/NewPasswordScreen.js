 import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
 import React, {useState} from 'react';
 import Custominput from '../../Components/Custominput';
 import CustomButton from '../../Components/CustomButton';
import SocialSignInButtons from '../../Components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';


 
 const NewPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [newPassword,setNewPassword]=useState('');

  const navigation= useNavigation();
  const route = useRoute();
  const { oobCode } = route.params;

  const onSubmitPressed = async () => {
    try {
      await auth().confirmPasswordReset(oobCode, newPassword);
      Alert.alert("Success", "Password has been reset!");
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

 
  

     return (
      <ScrollView showsVerticalScrollIndicator={false}>

     <View style={styles.container}>
         <Text style={styles.title}>
            Reset Your Password
         </Text>

         <Custominput placeholder='Enter your email' 
         value={email} 
         setValue={setEmail}
         />
         <Custominput placeholder='Enter your new Password' 
         value={newPassword} 
         setValue={setNewPassword}
         secureTextEntry
         />
         <CustomButton text="Submit" 
         onPress={onSubmitPressed}
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
 
 export default NewPasswordScreen;             