import React, {useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import Posts from "./Posts";
import { Feather } from '@expo/vector-icons';
const ProfilePage = ({ user }) => {
  const [text, setText] = useState("");
 
  const submitBtnText = async () => {
    if(text.length===0){
       console.log("Not Creating Post.......");
    }else{
   const data = {
    text:text,
    id:user.id,
    state:user.state
   }
    setText("");
    const res = await axios.post(
      `https://farmersposts-production.up.railway.app/api/upload/`,data
    );
    }
  };

const DeleteAllHandeller=async()=>{
  try {
    await axios.delete(`https://farmersposts-production.up.railway.app/api/upload/deleteAll/${user.id}`)
  } catch (error) {
    console.log(error);
  }
}


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
      <TouchableOpacity style={styles.DeleteAll} onPress={DeleteAllHandeller}>
       <Text style={{color:"#ffffff"}}>Delete All</Text>
       <Feather name="delete" size={24} color="white" />
      </TouchableOpacity>
      <Posts user={user} active={true} />      
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
  DeleteAll:{
    flexDirection:'row',
    marginLeft:'auto',
    marginRight:20,
    alignItems:'center',
    marginVertical:10,
    backgroundColor:'red',
    width:150,
    height:40,
    justifyContent:'space-around',
    borderRadius:10,
    borderColor:'grey',
    borderWidth:3
  },

});

export default ProfilePage;
