import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const Post = ({ props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text style={{ marginLeft: "auto", paddingBottom: 2, color: "grey" }}>
        {" "}
        2 min ago{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "5%",
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: "grey",
  },
});

export default Post;
