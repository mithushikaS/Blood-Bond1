import { View, TextInput, StyleSheet,Text } from 'react-native'
import React from 'react'

const Custominput = ({value, setValue, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.root}>
      <TextInput 
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
       styles={styles.input}
       secureTextEntry={secureTextEntry}
       />
    </View>
  );
};
const styles= StyleSheet.create({
    root:{
        backgroundColor:'white',
        width:'100%',
        height:40,
       justifyContent:'center',

        borderColor: '#e8e8e8',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 9,
        marginVertical:10,


    },
    input:{},
});

export default Custominput;