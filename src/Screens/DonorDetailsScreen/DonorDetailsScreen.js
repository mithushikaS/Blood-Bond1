import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const DonorDetailsScreen = () => {
  const [donor, setDonor] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  useEffect(() => {
    if (user) {
      console.log('Received user:', user); // Debugging log
      setDonor(user);
    }
  }, [user]);

  const handleRequestPress = async () => {
    try {
      const donorData = {
        name: donor.name || 'Unknown',
        location: donor.location || 'Unknown',
        bloodType: donor.bloodType || 'Unknown', // Updated to use bloodType
        lastDonatedDate: donor.lastDonatedDate || 'Unknown',
        profileImage: donor.profileImage || '', // Set a default empty string if the profile image is missing
        requestedAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('request_start').add(donorData);

      Alert.alert('Success', 'Request has been successfully created.');
      navigation.navigate('SuccessRequestScreen'); 
    } catch (error) {
      console.error('Error creating request:', error);
      Alert.alert('Error', 'Something went wrong while creating the request.');
    }
  };

  if (!donor) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.donorCard}>
        <Text style={styles.header}>Donor Details</Text>
        <Image 
          source={donor.profileImage ? { uri: donor.profileImage } : require('../../../assets/images/profile7.jpg')} 
          style={styles.profileImage} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{donor.name ? donor.name : 'Not available'}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{donor.location ? donor.location : 'Not available'}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Blood Type:</Text>
          <Text style={styles.text}>{donor.bloodType ? donor.bloodType : 'Not available'}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Last Donated Date:</Text>
          <Text style={styles.text}>{donor.lastDonatedDate ? donor.lastDonatedDate : 'Not available'}</Text>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#a31a28' }]} onPress={handleRequestPress}>
          <Icon name="rocket" size={20} color="white" />
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  donorCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6b0711',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b0711',
    width: 150,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 8,
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DonorDetailsScreen;