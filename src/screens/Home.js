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
      <Navbar user={user} setUser={setUser} navigation={navigation} />
      <Cards />
    </View>
  );
}
