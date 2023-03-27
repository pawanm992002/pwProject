import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "../../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function ContactsPage({ navigation, user }) {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const usersRef = firebase.firestore().collection("users");
    const snapshot = await usersRef.get();
    const users = [];
    snapshot.forEach((doc) => {
      let temp = doc.data();
      if (user.isFarmer && !temp.isFarmer && temp.state === user.state) {
        users.push(temp);
      } else if (!user.isFarmer && temp.isFarmer && temp.state === user.state) {
        users.push(doc.data());
      }
    });
    setContacts(users);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openContact = (receiver) => {
    navigation.navigate("Chat", { user, receiver });
  };

  const ChatComp = ({ user }) => {
    return (
      <TouchableOpacity
        style={styles.ChatCompstyle}
        onPress={() => {
          openContact(user);
        }}
      >
        <Text style={{ fontWeight: "bold" }}> {user.fullName} </Text>
        <Text style={{ color: "#78787a", fontSize: 12 }}> {user.state} </Text>
      </TouchableOpacity>
    );
  };

  const showProfle = () => {};

  return (
    <ImageBackground
      style={{ zIndex: 1000, height: "100%", width: "100%" }}
      source={require("../../../assets/contactBack.jpeg")}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.nav}>
          <Icon
            name="arrow-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>
            {user.fullName.length > 10
              ? user.fullName.substring(0, 10) + "..."
              : user.fullName}
          </Text>
        </View>
        <View>
          {!contacts ? (
            <Text> no contacts </Text>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                data={contacts}
                renderItem={({ item }) => <ChatComp user={item} />}
                keyExtractor={(item) => {
                  return item.id;
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
