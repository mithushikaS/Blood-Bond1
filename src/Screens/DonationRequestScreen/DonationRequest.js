import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
 import React, {useState} from 'react';
 import Custominput from '../../Components/Custominput';
 import CustomButton from '../../Components/CustomButton';
 import { Picker } from '@react-native-picker/picker';
 import firestore from '@react-native-firebase/firestore';
import axios from 'axios';



 
 const DonationRequest = ({navigation}) => {
 

  const [name, setName]=useState('');
  const[bloodGroup,setBloodGroup]=useState('');
  const[bloodType,setBloodType]=useState('');
  const [gender, setGender]=useState('');
  const[idNumber,setIDNumber]=useState('');
  const[address,setAddress]=useState('');
  const[contactNo1,setContactNo1]=useState('');
  const[contactNo2,setContactNo2]=useState('');
  const[age,setAge]=useState('');
  const[weight,setWeight]=useState('');
  const[lastBloodDonationDate,setLastBloodDonationDate]=useState('');
  

  const onNextPressed = () => {
    // Check if any field is empty
    if (
      !name ||
      !bloodGroup ||
      !bloodType ||
      !gender ||
      !idNumber ||
      !address ||
      !contactNo1 ||
      !contactNo2 ||
      !age ||
      !weight ||
      !lastBloodDonationDate
    ) {
      Alert.alert('Incomplete Information', 'Please fill out all fields.');
      return;
    }
  
    // Check for valid age and weight
    if (isNaN(age) || isNaN(weight)) {
      Alert.alert('Invalid Information', 'Please enter a valid age and weight.');
      return;
    }
  
    // Check if contact numbers are valid
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contactNo1) || !contactRegex.test(contactNo2)) {
      Alert.alert('Invalid Information', 'Please enter valid contact numbers.');
      return;
    }
  
    // Prepare donor data
    const donorData = {
      name,
      bloodGroup,
      bloodType,
      gender,
      idNumber,
      address,
      contactNo1,
      contactNo2,
      age,
      weight,
      lastBloodDonationDate,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
  
    // Add donor data to Firestore
    firestore()
      .collection('donors')
      .add(donorData)
      .then(() => {
        Alert.alert('Success', 'Donor information has been saved successfully.');
        navigation.navigate('WeightQ1');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  

 
  

     return (
      <ScrollView showsVerticalScrollIndicator={false}>

     <View style={styles.container}>
         <Text style={styles.title}>
            Create an account
         </Text>
         
         <Custominput placeholder='Name' 
         value={name} 
         setValue={setName}
         />

         
           <Custominput placeholder='Blood Group' 
         value={bloodGroup} 
         setValue={setBloodGroup}
         
         />
        
         <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Blood Type</Text>
        <Picker
          selectedValue={bloodType}
          style={styles.picker}
          onValueChange={(itemValue) => setBloodType(itemValue)}>
          <Picker.Item label="Select Here!" value="" style={{ color: '#999' }}/>
          <Picker.Item label="A+" value="A+" />
          <Picker.Item label="A-" value="A-" />
          <Picker.Item label="B+" value="B+" />
          <Picker.Item label="B-" value="B-" />
          <Picker.Item label="AB+" value="AB+" />
          <Picker.Item label="AB-" value="AB-" />
          <Picker.Item label="O+" value="O+" />
          <Picker.Item label="O-" value="O-" />
        </Picker>
      </View>
     
     

         
         <Custominput placeholder='Gender' 
         value={gender} 
         setValue={setGender}
         />
         
         <Custominput placeholder='ID Number' 
         value={idNumber} 
         setValue={setIDNumber}
         />
         
         <Custominput placeholder='Address' 
         value={address} 
         setValue={setAddress}
         />
         
         <Custominput placeholder='Contact No 1' 
         value={contactNo1} 
         setValue={setContactNo1}
         />
         
         <Custominput placeholder='Contact No 2' 
         value={contactNo2} 
         setValue={setContactNo2}
         />
         
         <Custominput placeholder='Age' 
         value={age} 
         setValue={setAge}
         />
         
         <Custominput placeholder='Weight' 
         value={weight} 
         setValue={setWeight}
         />
         
         <Custominput placeholder='Last Blood Donation Date' 
         value={lastBloodDonationDate} 
         setValue={setLastBloodDonationDate}
         />

        <CustomButton text="Next" 
         onPress={onNextPressed}
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

      
    picker: {
      width: '100%',
      height: 40,
      borderWidth: 2,
      borderColor: '#e5e4e2',
      borderRadius: 7,
      
    },

    pickerContainer: {
      width: '100%',
      marginVertical:10,
      borderWidth: 2,
      borderColor: '#e5e4e2',
      borderRadius: 7,
      backgroundColor:'white',
    },
  
    pickerLabel: {
      fontSize: 16,
      color: '#6b0711',
      marginBottom: 5,
      marginLeft:10,
      marginTop:10,
    },
     

 });
 
 export default DonationRequest;           