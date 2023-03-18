import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Navbar = () => {
  return (
    <View style={styles.navbar}>
    <Image  style={styles.logo}
    source={{
      uri: 'https://picsum.photos/50/50',
    }}
    />
      <Text style={styles.textLogo}>Kisan Mitra</Text>
      <TouchableOpacity>
      <MaterialCommunityIcons name="hamburger" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    navbar:{
       flexDirection:'row',
       justifyContent:'space-between',
       paddingHorizontal:10,
       paddingVertical:5,
       alignItems:'center',
       backgroundColor:"grey"
    },   
    textLogo:{
        fontSize:25,
        fontStyle:'italic',
        color:'blue'
    },
    logo:{
        width:50,
        height:50,
        borderRadius:50
    }
})

export default Navbar;