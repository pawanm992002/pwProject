import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home({ navigation, user, setUser }) {
  return (
    <SafeAreaView style={{ marginBottom: 40 }}>
      <Navbar user={user} setUser={setUser} navigation={navigation} />
      <Cards />
    </SafeAreaView>
  );
}
