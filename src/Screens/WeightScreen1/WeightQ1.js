import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const buttonStyle = {
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#C0C0C0', // zinc-300
    color: '#C0C0C0', // zinc-700
    borderRadius: 25, // rounded-full
    paddingVertical: 10, // py-2
    paddingHorizontal: 20, // px-4
    marginBottom: 20, // mb-4
    width: '100%',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF69B4', // pink-500
    color: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    textAlign: 'center',
  },
};

const QuestionComponent = ({navigation}) => {


  const Kisho=()=>{
    navigation.navigate('WeightQ2');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.question}>Is your weight less than 50kg?</Text>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Yes</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>No</Text></TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton}><Text style={styles.buttonText} onPress={Kisho}>Next →</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB', // pink-200
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    maxWidth: '80%',
    width: '100%',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    ...buttonStyle.button,
  },
  primaryButton: {
    ...buttonStyle.primaryButton,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default QuestionComponent;
