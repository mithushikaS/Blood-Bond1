import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DonorDetailsScreen = () => {
  const [donors, setDonors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const donorSnapshot = await firestore().collection('donors').get();
        const donorList = donorSnapshot.docs.map(doc => {
          const data = doc.data();
          const lastDonatedDate = calculateLastDonatedDate(data.months);
          return {
            ...data,
            location: data.address,
            lastDonatedDate,
            profileImage: require('../../../assets/images/profile7.jpg'),
          };
        });
        setDonors(donorList);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong while fetching donor details.');
      }
    };

    fetchDonors();
  }, []);

  const calculateLastDonatedDate = (months) => {
    const currentDate = new Date();
    const donationDate = new Date();
    donationDate.setMonth(currentDate.getMonth() - months);
    return donationDate.toLocaleDateString();
  };

  const handleRequestPress = async (donor) => {
    try {
      await firestore().collection('request_start').add({
        name: donor.name,
        location: donor.location,
        bloodGroup: donor.bloodGroup,
        lastDonatedDate: donor.lastDonatedDate,
        profileImage: donor.profileImage,
        requestedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Request has been successfully created.');
      navigation.navigate('SuccessRequestScreen'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while creating the request.');
    }
  };

  const renderDonorItem = ({ item }) => (
    <View style={styles.donorCard}>
      <Text style={styles.header}>Donor Details</Text>
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.text}>{item.location}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Blood Group:</Text>
        <Text style={styles.text}>{item.bloodGroup}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Last Donated Date:</Text>
        <Text style={styles.text}>{item.lastDonatedDate}</Text>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#a31a28' }]} onPress={() => handleRequestPress(item)}>
        <Icon name="rocket" size={20} color="white" />
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={donors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDonorItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingBottom: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#6b0711',
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