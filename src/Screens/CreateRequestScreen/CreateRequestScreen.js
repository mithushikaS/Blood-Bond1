import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Custominput from '../../Components/Custominput';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const CreateRequestScreen = () => {
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [note, setNote] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = async () => {
    if (!city || !hospital || !bloodType || !mobileNumber || !note) {
      Alert.alert('Incomplete Information', 'Please fill out all fields.');
      return;
    }

    if (!/^\d+$/.test(mobileNumber)) {
      Alert.alert('Invalid Information', 'Please enter a valid mobile number.');
      return;
    }

    try {
      // Save request to Firestore
      const requestRef = await firestore().collection('create_request').add({
        city,
        hospital,
        bloodType,
        mobileNumber,
        note,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Find eligible donors
      const donorsSnapshot = await firestore().collection('donors').get();
      const donors = donorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Check blood type compatibility and send notifications
      for (const donor of donors) {
        const response = await axios.post('http://172.20.10.5:5002/predict', {
          blood_type: donor.bloodType,
          recipient_blood_type: bloodType,
        });

        if (response.data.compatible) {
          const { notificationToken } = donor;
          if (notificationToken) {
            await sendNotification(notificationToken, city, hospital, bloodType, mobileNumber, note);
          }
          // Store the request details in the donor's document
          await firestore().collection('donors').doc(donor.id).collection('requests').add({
            requestId: requestRef.id,
            city,
            hospital,
            bloodType,
            mobileNumber,
            note,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        }
      }

      Alert.alert('Success', 'Request created and notifications sent to eligible donors.');
      navigation.navigate('SuccessRequestScreen'); // Updated screen name
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const sendNotification = async (token, city, hospital, bloodType, mobileNumber, note) => {
    const message = {
      to: token,
      notification: {
        title: 'New Blood Request',
        body: `Request for ${bloodType} blood in ${city} at ${hospital}. Note: ${note}`,
      },
      data: {
        city,
        hospital,
        bloodType,
        mobileNumber,
        note,
      },
    };

    await messaging().sendMessage(message);
  };

  const handleMobileNumberChange = (inputValue) => {
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setMobileNumber(inputValue);
    } else {
      Alert.alert('Error', 'Please enter numbers only.');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a Request</Text>

        <Custominput
          placeholder='City'
          value={city}
          setValue={setCity}
          Icon="city-icon"
        />

        <Custominput
          placeholder='Hospital'
          value={hospital}
          setValue={setHospital}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Blood Type</Text>
          <Picker
            selectedValue={bloodType}
            style={styles.picker}
            onValueChange={(itemValue) => setBloodType(itemValue)}>
            <Picker.Item label="Select Here!" value="" style={{ color: '#999' }} />
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

        <TextInput
          placeholder='Mobile'
          value={mobileNumber}
          style={styles.input}
          onChangeText={handleMobileNumberChange}
          keyboardType='numeric'
        />

        <Custominput
          placeholder='Add a Note'
          value={note}
          setValue={setNote}
        />

        <CustomButton text="Request" onPress={onRegisterPressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b0711',
    margin: 35,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e4e2',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderRadius: 7,
    backgroundColor: 'white',
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
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#e5e4e2',
    borderRadius: 7,
    backgroundColor: 'white',
  },
  pickerLabel: {
    fontSize: 16,
    color: '#6b0711',
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default CreateRequestScreen;
