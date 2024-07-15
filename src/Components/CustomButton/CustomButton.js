import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


const CustomButton = ({onPress, text, type="PRIMARY", bgColor, FgColor}) => {
  
  return (
    <Pressable onPress={onPress} 
    style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
        ]}>
      <Text 
      style={[
        styles.text,
        styles[`text_${type}`],
        FgColor ? {color: FgColor} : {},
        ]}>
            {text}
            </Text>
    </Pressable>
  );
};
const styles=StyleSheet.create({
    container: {
    

    width:'100%',

    padding:10,
    marginVertical:15,
    borderRadius:30,

    alignItems:'center',
   },
   container_PRIMARY:{
    backgroundColor:'#a31a28',
   },
   container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
   },
   container_TERTIARY:{},
    text:{
        fontWeight: 'bold',
        color:'white',
    },
    text_SECONDARY: {
      color: '#3B71F3'
    },
    text_TERTIARY:{
        color: 'gray',
    },
    
});

export default CustomButton;