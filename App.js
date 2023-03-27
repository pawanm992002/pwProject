import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen/RegistrationScreen";
import ContactsPage from "./src/screens/ContactsPage/ContactsPage";
import ChatScreen from "./src/screens/ChatScreen/ChatScreen";
import SchemesPage from "./src/screens/SchemesPage/SchemesPage";
import ProfilePage from "./src/components/ProfilePage";

import Home from "./src/screens/Home";

import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setUser(JSON.parse(value));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveData("userInfo");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Contacts" options={{ headerShown: false }}>
              {(props) => <ContactsPage {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Chat">
              {(props) => <ChatScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Schemes">
              {(props) => <SchemesPage {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => <ProfilePage {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
