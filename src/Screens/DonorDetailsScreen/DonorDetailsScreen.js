import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DonorDetailsScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const handleRequestPress = async () => {
    try {
      await firestore().collection('request_start').add({
        name: user.name,
        location: user.location,
        bloodGroup: user.bloodGroup,
        lastDonatedDate: user.lastDonatedDate,
        profileImage: user.profileImage,
        requestedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Request has been successfully created.');
      navigation.navigate('SuccessRequestScreen'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while creating the request.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.details}>      
        <Text style={styles.header}>User Details</Text>
        <Image source={user.profileImage} style={styles.profileImage} />
        <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{user.name}</Text>
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{user.location}</Text>
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.label}>Blood Group:</Text>
            <Text style={styles.text}>{user.bloodGroup}</Text>
        </View>
        <View style={styles.userInfo}>
            <Text style={styles.label}>Last Donated Date:</Text>
            <Text style={styles.text}>{user.lastDonatedDate}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#a31a28' }]}>
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
  details: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6b0711',
    textAlign:'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:5,
    paddingTop:8,
    paddingHorizontal:50,
    borderRadius: 8,
    elevation:2,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DonorDetailsScreen;
