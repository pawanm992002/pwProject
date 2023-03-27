import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";

import { SafeAreaView } from "react-native-safe-area-context";
import Posts from "../components/Posts";

export default function Home({ navigation, user, setUser }) {
  return (
    <SafeAreaView style={{ marginBottom: 40 }}>
      <Navbar user={user} setUser={setUser} navigation={navigation} />
    
      {
     user.isFarmer?
      <Cards user={user}/>:<Posts user={user}/>
    }
      </SafeAreaView>
  );
}
