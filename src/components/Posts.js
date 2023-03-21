import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";

const Posts = () => {
  //   const [post,setPosts] = useState({});
  const post = {
    _id: 1,
    img: "assets/favicon.png",
  };
  useEffect(() => {
    const fetching = async () => {
      const res = await axios.get(``);
      setPosts(res.data);
    };
    //  fetching();
  }, []);

  //   {post?post.map(e=>{<Post key={e._id} props={e}/>}):null}
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 290,
  },
});

export default Posts;
