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

export default function ChatScreen({ route }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const sender = route.params.user.id;
  const receiver = route.params.receiver.id;

  const handleSend = async () => {
    const data = {
      receiver: receiver,
      message: message,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
    const fetchMessage = () => {
      const chatRef = firebase.firestore().collection("chats");
      const currdoc = chatRef.doc(sender);
      currdoc.get().then((res) => {
        let arr = res.data();
        if (arr) {
          const filtered = arr.msg.filter((val) => {
            if (val.receiver === receiver) return val;
          });
          setMessages(filtered);
        }
      });
    };
    fetchMessage();
  }, [messages]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.message}>
        <Text>{item.message}</Text>
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
  },
});
