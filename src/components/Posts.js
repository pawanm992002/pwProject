import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import { ScrollView } from 'react-native';
import axios from 'axios';

const Posts = ({user , active}) => {
    const [posts, setposts] = useState({});
    const [state, setstate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          // fetch all posts
          const resp = active? await axios.get(
            `https://farmersposts-production.up.railway.app/api/upload/userposts/${user.id}`
          ):await axios.get(
            `https://farmersposts-production.up.railway.app/api/upload/${user.state}`
          );
          setposts(resp.data.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)));
          setstate(true);
        };
        fetchData();
      }, [posts]);

  return (
    <ScrollView  style={active?styles.PostContainer:styles.Feed} showsVerticalScrollIndicator={false}>
    {state
      ? posts
      ? posts.map((e) => <Post key={e._id} props={e} user={user}/>)
      : null
      : null
    }
      </ScrollView> 
  )
}

export default Posts

const styles = StyleSheet.create({
    PostContainer:{
        marginBottom:280
      },
      Feed:{
        marginBottom:30
      }
})