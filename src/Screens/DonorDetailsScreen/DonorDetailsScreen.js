import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const DonorDetailsScreen = () => {
  const [donor, setDonor] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { donorId } = route.params; // Ensure donorId is passed via route parameters

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const donorDoc = await firestore().collection('donors').doc(donorId).get();
        if (donorDoc.exists) {
          setDonor(donorDoc.data());
        } else {
          Alert.alert('Error', 'Donor not found');
        }
      } catch (error) {
        console.error('Error fetching donor details:', error);
        Alert.alert('Error', 'Something went wrong while fetching donor details.');
      }
    };

    if (donorId) {
      fetchDonorDetails();
    }
  }, [donorId]);

  const handleRequestPress = async () => {
    try {
      const donorData = {
        name: donor.name || 'Unknown',
        location: donor.address || 'Unknown', // Assuming address is the location
        bloodType: donor.bloodType || 'Unknown',
        lastDonatedMonths: donor.months || 'Unknown', // Months since last donation
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

  const calculateLastDonationDate = (months) => {
    if (!months) return 'Unknown';
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - months);
    return currentDate.toLocaleDateString(); // Format date as needed
  };

  if (!donor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.donorCard}>
          <Text style={styles.header}>Donor Details</Text>
          <Image
            source={donor.profileImage ? { uri: donor.profileImage } : require('../../../assets/images/profile7.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{donor.name || 'Unknown'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{donor.address || 'Unknown'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Blood Type:</Text>
            <Text style={styles.text}>{donor.bloodType || 'Unknown'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Last Donation Date:</Text>
            <Text style={styles.text}>{calculateLastDonationDate(donor.months)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>Months Since Last Donation:</Text>
            <Text style={styles.text}>{donor.months || 'Unknown'}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRequestPress}>
            <Icon name="rocket" size={20} color="white" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 20,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'center',
    backgroundColor: '#a31a28',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DonorDetailsScreen;
