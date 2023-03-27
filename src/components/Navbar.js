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
    <View style={{ ...styles.navbar, zIndex: 100 }}>
      <View style={styles.navBox}>
        <Image
          style={{ ...styles.logo, zIndex: 1000 }}
          source={{
            uri: "https://picsum.photos/50/50",
          }}
        />
        <Text style={styles.textLogo}>Kisan Mitra</Text>
        <TouchableOpacity
          onPress={Toggleing}
          style={{ zIndex: 100, marginTop: 4 }}
        >
          <MaterialCommunityIcons name="hamburger" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={Toggle ? styles.Visible : styles.Hide}>
        <View style={styles.content}>
          <View style={styles.parentComponent}>
{ user.isFarmer &&
  <>
            <TouchableOpacity
              style={styles.styledBtn}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.btnText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.styledBtn}
              onPress={() => {
                navigation.navigate("Schemes");
              }}
            >
              <Text style={styles.btnText}>Schemes for Farmers</Text>
            </TouchableOpacity>
            </>     
          }
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
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "grey",
  },
  navBox: {
    backgroundColor: "red",
    height: 60,
    flexDirection: "row",
    zIndex: 1000,
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  textLogo: {
    fontSize: 25,
    fontStyle: "italic",
    color: "white",
    zIndex: 99,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 45,
    borderRadius: 50,
    backgroundColor: "red",
  },
  Visible: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "110%",
    height: 800,
    color: "white",
    backgroundColor: "grey",
  },
  Hide: {
    position: "absolute",
    right: -500,
    top: 0,
    width: 300,
    height: 700,
    color: "white",
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
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  styledBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: "10%",
  },
  btnText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "red",
    borderRadius: 10,
    width: "60%",
    height: 50,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10%",
    marginLeft: "20%",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Navbar;
