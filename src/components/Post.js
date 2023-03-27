import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
const Post = ({ props ,user , }) => {
  const dateTimeAgo = moment(props.createdAt).fromNow();
// console.log(user);
const PostDelete = async()=>{
     try {
      await axios.delete(`https://farmersposts-production.up.railway.app/api/upload/${props._id}`); 
     } catch (error) {
      console.log(error);
     }
}
  return (
    <View style={styles.container}>
       <View style={styles.PostHeader}>
           <Text style={styles.text}>{user.fullName}</Text> 
          {user.id===props.uid && <AntDesign name="delete" size={24} color="red" onPress={PostDelete}/>}
       </View>

      <View>
      <Text style={styles.content}>
         {props.text}
      </Text>
      </View>
      <View style={styles.PostBottom}>
      <Text style={styles.text}> {user.state} </Text>
      <Text style={{color:'grey',}}>
          {dateTimeAgo}
      </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginLeft: "5%",
    marginVertical: 20,
  },
  PostHeader:{
     flexDirection:'row',
     justifyContent:'space-between',
     padding:10
  },
  text:{
   fontSize:15,
   color:'grey' 
  },
  content: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    color: "#8a7863",
    
  },
  PostBottom:{
    flexDirection:'row',
    justifyContent:'space-between'
    ,padding:10
  }
});

export default Post;
