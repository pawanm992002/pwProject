import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import firebase from "../../firebase/config";
import Navbar from "../../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen({ route }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sender = route.params.user.id;
  const receiver = route.params.receiver.id;

  const handleSend = async () => {
    const data = {
      sender: sender,
      receiver: receiver,
      message: message,
      createdAt: Date(),
    };
    const chatRef = firebase.firestore().collection("chats");
    const currdoc = chatRef.doc(sender);
    const isExists = (await currdoc.get()).data();
    if (isExists) {
      if (data.message) {
        const arr = [...isExists.msg, data];
        setMessages(arr);
        currdoc.update({ msg: arr });
      }
    } else {
      data.message !== "" ? currdoc.set({ msg: [data] }) : none;
    }
    setMessage("");
  };

  useEffect(() => {
    let showChat = [];
    const chatRef = firebase.firestore().collection("chats");
    chatRef.onSnapshot((temp) => {
      temp.forEach((doc) => {
        if (doc) {
          let docDate = doc.data().msg;
          let x = docDate.filter((fields) => {
            if (
              (fields.sender === sender && fields.receiver === receiver) ||
              (fields.sender === receiver && fields.receiver === sender)
            ) {
              return fields;
            }
          });
          showChat = [...x, ...showChat];
        }
      });
      setMessages(showChat);
      messages.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        else return 1;
      });
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          alignItems: item.sender === sender ? "flex-end" : "flex-start",
        }}
      >
        <Text
          style={{
            ...styles.message,
            backgroundColor: item.sender === sender ? "#b5d7e8" : "#f2aaa5",
          }}
        >
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <FontAwesome name="send" size={24} color="#0084ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  message: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    width: "80%",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
    paddingVertical: 5,
    height: 50,
  },
});
