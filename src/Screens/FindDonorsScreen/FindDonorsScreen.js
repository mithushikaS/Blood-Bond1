import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const FindDonorsScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [userList, setUserList] = useState([]);

  // Dummy data for user list
  const dummyUsers = [
    { id: 1, name: 'John Doe', location: 'New York', bloodGroup: 'O+', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile5.jpg') },
    { id: 2, name: 'Jane Smith', location: 'Los Angeles', bloodGroup: 'A-', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile2.jpg') },
    { id: 3, name: 'Michael Johnson', location: 'Chicago', bloodGroup: 'B+', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile3.jpg') },
    { id: 4, name: 'Emily Brown', location: 'Houston', bloodGroup: 'AB-', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile4.jpg') },
    { id: 5, name: 'William Davis', location: 'Miami', bloodGroup: 'O-', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile6.jpg') },
    { id: 6, name: 'Sarah Wilson', location: 'Seattle', bloodGroup: 'A+', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile6.jpg') },
    { id: 7, name: 'Christopher Lee', location: 'San Francisco', bloodGroup: 'B-', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile7.jpg') },
    { id: 8, name: 'Jessica Martinez', location: 'Dallas', bloodGroup: 'AB+', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile8.jpg')},
    { id: 9, name: 'Daniel Taylor', location: 'Atlanta', bloodGroup: 'A-', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile2.jpg')},
    { id: 10, name: 'Amanda White', location: 'Boston', bloodGroup: 'O+', lastDonatedDate: '2023-05-10',profileImage: require('../../../assets/images/profile4.jpg') },
    // Add more dummy users as needed
  ];

  // Function to handle search
  const handleSearch = () => {
    // Implement search functionality here
    // For simplicity, let's filter the dummyUsers based on searchText
    const filteredUsers = dummyUsers.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setUserList(filteredUsers);
  };

  // Function to render each user item
  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => navigation.navigate('DonorDetailsScreen', { user: item })}>
      <View style={styles.userInfo}> 
       
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDetail}>Location: {item.location}</Text>
        <Text style={styles.userDetail}>Blood Group: {item.bloodGroup}</Text>
      </View>
      <Image source={item.profileImage} style={styles.profileImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Donors</Text>
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search by name..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />

      </View>
      
      {/* User List */}
      <FlatList
        data={searchText ? userList : dummyUsers}
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
    color:'#6b0711',
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