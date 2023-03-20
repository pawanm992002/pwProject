import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfilePage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [text, setText] = useState();
  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };
  return (
    <View>
      <View style={styles.Box}>
        <Text style={styles.heading}> Create a post </Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TouchableOpacity onPress={handleImageSelect} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.SubmitBtn}>
          <Text style={styles.submitBtnText}> Submit </Text>
        </TouchableOpacity>
      </View>
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
