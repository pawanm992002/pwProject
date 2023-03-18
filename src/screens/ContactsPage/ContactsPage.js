import React, { useEffect, useState } from "react";
import styles from "./styles";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import firebase from "../../firebase/config";

export default function ContactsPage({ navigation, user }) {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const usersRef = firebase.firestore().collection("users");
    const snapshot = await usersRef.get();
    const users = [];
    snapshot.forEach((doc) => {
      if (user.isFarmer && !doc.data().isFarmer) {
        users.push(doc.data());
      } else if (!user.isFarmer && doc.data().isFarmer) {
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
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>{user.fullName}</Text>
        <TouchableOpacity
          onPress={showProfle}
          style={{ width: "25%", justifyContent: "center" }}
        >
          <Text style={{ color: "red" }}> Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        {!contacts ? (
          <Text> no contacts </Text>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={contacts}
              renderItem={({ item }) => <ChatComp user={item} key={item.id} />}
              keyExtractor={(item) => {
                item.id;
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
