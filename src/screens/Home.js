import { Text, View } from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, user, setUser }) {
  const showProfile = () => {};
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
        {user.isFarmer ? (
          <Text> Chat with Customer </Text>
        ) : (
          <Text> Chat with Farmer </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setUser(null);
          AsyncStorage.removeItem("userInfo");
          navigation.navigate("Home");
        }}
      >
        <TouchableOpacity onPress={showProfile}>
          <Text> Profile </Text>
        </TouchableOpacity>
        <Text> signOut </Text>
      </TouchableOpacity>
      <Navbar />
      <Cards />
    </View>
  );
}
