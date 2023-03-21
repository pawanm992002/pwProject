import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function otherHome() {
  const [post, setPosts] = useState();
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        `https://farmerspost-production.up.railway.app/api/upload/getuser`,
        { state: state }
      );
    };
    // fetchdata();
  }, []);

  return (
    <View>
      <Text>otherHome</Text>
    </View>
  );
}
