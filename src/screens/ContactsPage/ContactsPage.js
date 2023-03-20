import React, { useEffect, useState } from "react";
import styles from "./styles";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
      if (
        user.isFarmer &&
        !doc.data().isFarmer &&
        doc.data().state === user.state
      ) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Icon
          style={{ marginLeft: 8, marginTop: 10 }}
          name="arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
        />
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
              renderItem={({ item }) => <ChatComp user={item} />}
              keyExtractor={(item) => {
                return item.id;
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
