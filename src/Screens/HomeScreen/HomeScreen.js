import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet,Image, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import HomeImg from "../../../assets/images/bloodbg1.jpg";


const HomeScreen = () => {
  const navigation = useNavigation();

  const DonationRequestScreen = () => {
    // Navigate to Donation Request screen
    navigation.navigate('DonationRequest');
  };

  const ProfileScreen = () => {
    // Navigate to Search screen
    navigation.navigate('Profile');
  };

  const CreateRequestScreen = () => {
    // Navigate to Create Request screen
    navigation.navigate('CreateRequest');
  };

  const FindDonorsScreen = () => {
    // Navigate to Find Donors screen
    navigation.navigate('FindDonors');
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Blood Bond</Text>
      
      <Image source={HomeImg} style={styles.image} alt=''/>


      <View style={styles.touchableContainer}>

      <TouchableOpacity
        style={styles.touchable}
          onPress={DonationRequestScreen}>
        <Text style={styles.buttonText}>Become a Donors</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={ProfileScreen}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={CreateRequestScreen}>
        <Text style={styles.buttonText}>Create Request</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={FindDonorsScreen}>
        <Text style={styles.buttonText}>Find Donors</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.bottomBar}>
        <Icon style={styles.Homeicon} name="home" size={40} color="red" />
      </View>
      
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container:{

  },
  
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 300, 
  },
  header:{
    color:'#d40000',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    fontSize:40,
    paddingTop:20,
    fontWeight:'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset 
    textShadowRadius: 5, // Shadow radius
  },

  touchableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 25,
  },

  touchable: {
    backgroundColor: '#dc143c',
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:2,
    borderRadius: 10,
    elevation: 3,
  },

  buttonText: {
    color:'white',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset 
    textShadowRadius: 5, // Shadow radius
  },
  bottomBar: {
    bottom: 1,
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'red',
  },
  
  Homeicon:{
    backgroundColor:'#f0f0f0',
    borderRadius: 10,
    alignItems:'center',
    borderColor:'red',

  },
  
 });

export default HomeScreen;


