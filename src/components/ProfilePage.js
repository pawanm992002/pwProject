import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../firebase/config";
import axios from "axios";
import Posts from "./Posts";

const ProfilePage = ({ user }) => {
  const [posts, setposts] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // fetch all posts
      const resp = await axios.get(
        `https://farmerspost-production.up.railway.app/api/upload/userposts/${user.id}`
      );
      setposts(resp.data);
    };
    // fetchData();
  }, []);

  const submitBtnText = async () => {
    const res = await axios.post(
      `https://farmerspost-production.up.railway.app/api/upload/${user.id}/${user.state}/${text}`
    );
    console.log(res);
    //  we have to reload window
    // window.NavigationPreloadManager();
  };
  return (
    <View>
      <View style={styles.Box}>
        <Text style={styles.heading}> Create a post </Text>
        <TextInput
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: "80%",
            height: 40,
            textAlign: "center",
          }}
          placeholder="Enter Text"
          value={text}
          onChangeText={(t) => setText(t)}
        />
        <TouchableOpacity style={styles.SubmitBtn} onPress={submitBtnText}>
          <Text style={styles.submitBtnText}> Submit </Text>
        </TouchableOpacity>
      </View>
      {/* {posts
        ? posts.map((e) => {
            <Posts key={e.id} post={e} />;
          })
        : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  heading: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  SubmitBtn: {
    marginVertical: 20,
    width: 200,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: "white",
    fontSize: 20,
  },
});

export default ProfilePage;
