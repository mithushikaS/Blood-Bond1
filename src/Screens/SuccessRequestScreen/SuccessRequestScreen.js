import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for icons
import success from '../../../assets/images/Successbg.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';


const SuccessRequestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
           Create a Request
      </Text>

      <Image source={success} style={styles.img} alt=''/>


      <Text style={styles.text}> Blood is successfully requested </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        <Icon style={styles.Homeicon} name="arrow-right" size={30} color="white" />
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:20,
    marginVertical:50,
  },

  img: {
    width: 300,
    height:300,
    resizeMode: 'cover',
   
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },

  button: {
    backgroundColor: '#dc143c',
    padding: 10,
    borderRadius: 7,
    width:50,
  },

  title :{
    fontSize:24,
    fontWeight:'bold',
    color:'#6b0711',
    margin: 35,
    
  },
});


export default SuccessRequestScreen