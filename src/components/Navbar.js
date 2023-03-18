// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// const Navbar = () => {
//   return (
//     <View style={styles.navbar}>
//     <Image  style={styles.logo}
//     source={{
//       uri: 'https://picsum.photos/50/50',
//     }}
//     />
//       <Text style={styles.textLogo}>Kisan Mitra</Text>
//       <TouchableOpacity>
//       <MaterialCommunityIcons name="hamburger" size={30} color="black" />
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     navbar:{
//        flexDirection:'row',
//        justifyContent:'space-between',
//        paddingHorizontal:10,
//        paddingVertical:5,
//        alignItems:'center',
//        backgroundColor:"grey"
//     },
//     textLogo:{
//         fontSize:25,
//         fontStyle:'italic',
//         color:'blue'
//     },
//     logo:{
//         width:50,
//         height:50,
//         borderRadius:50
//     }
// })

// export default Navbar;
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Navbar = ({ user, setUser, navigation }) => {
  const [Toggle, setToggle] = useState(false);
  const Toggleing = () => {
    setToggle(!Toggle);
  };

  return (
    <View style={styles.navbar}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://picsum.photos/50/50",
        }}
      />
      <Text style={styles.textLogo}>Kisan Mitra</Text>
      <TouchableOpacity
        onPress={Toggleing}
        style={{ position: "relative", zIndex: 100 }}
      >
        <MaterialCommunityIcons name="hamburger" size={30} color="white" />
      </TouchableOpacity>
      <View style={Toggle ? styles.Visible : styles.Hide}>
        <View style={styles.content}>
          <View style={styles.parentComponent}>
            <TouchableOpacity style={styles.styledBtn}>
              <Text style={styles.btnText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.styledBtn}>
              <Text style={styles.btnText}>Schemes for Farmers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.styledBtn}
              onPress={() => navigation.navigate("Contacts")}
            >
              <Text style={styles.btnText}>Chat with Others</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.styledBtn}>
              <Text style={styles.btnText}>Upcoming</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            setUser(null);
            AsyncStorage.removeItem("userInfo");
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.btnText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "grey",
  },
  textLogo: {
    fontSize: 25,
    fontStyle: "italic",
    color: "blue",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  Visible: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 300,
    height: 700,
    color: "white",
    backgroundColor: "red",
  },
  Hide: {
    position: "absolute",
    right: -500,
    top: 0,
    width: 300,
    height: 700,
    color: "white",
    backgroundColor: "red",
  },
  content: {
    marginTop: 200,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    color: "yellow",
    textAlign: "center",
    fontSize: 20,
  },
  parentComponent: {
    backgroundColor: "#FF0000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  styledBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#FF0000",
    fontSize: 16,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "60%",
    height: 50,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
});

export default Navbar;
