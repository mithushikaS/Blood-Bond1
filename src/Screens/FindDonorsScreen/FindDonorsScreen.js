import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const FindDonorsScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchEligibleDonors();
  }, []);

  const fetchEligibleDonors = async () => {
    try {
      const donorSnapshot = await firestore().collection('donors').where('eligible', '==', true).get();
      const donors = donorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllUsers(donors);
    } catch (error) {
      console.error("Error fetching eligible donors: ", error);
    }
  };

  const handleSearch = async () => {
    try {
      const filteredUsers = [];
      for (const user of allUsers) {
        const isCompatible = await checkCompatibility(user.bloodType, searchText);
        if (isCompatible) {
          filteredUsers.push(user);
        }
      }
      setUserList(filteredUsers);
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  const checkCompatibility = async (donorBloodType, recipientBloodType) => {
    try {
      const response = await axios.post('http://172.20.10.5:5002/predict', {
        blood_type: donorBloodType,
        recipient_blood_type: recipientBloodType
      });
      return response.data.compatible;
    } catch (error) {
      console.error("Error checking compatibility: ", error);
      return false;
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => navigation.navigate('DonorDetailsScreen', { user: item })}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDetail}>Location: {item.location}</Text>
        <Text style={styles.userDetail}>Blood Group: {item.bloodGroup}</Text>
      </View>
      <Image source={item.profileImage ? { uri: item.profileImage } : require('../../../assets/images/profile7.jpg')} style={styles.profileImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Donors</Text>
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient blood type..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
      </View>
      <FlatList
        data={userList}
        renderItem={renderUserItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b0711',
  },
  searchBar: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 16,
    color: '#555',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default FindDonorsScreen;