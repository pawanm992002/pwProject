import {
  View,
  Text,
  ScrollView,
  ScrollViewBase,
  ScrollViewComponent,
  StyleSheet,
} from "react-native";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const Cards = () => {
  const [Data, setData] = useState({});
  const [state, setstate] = useState(false);
  useEffect(() => {
    const GetPosts = async () => {
      const res = await axios.get(
        `https://newsapi-production.up.railway.app/api/Posts/getPosts/Rajasthan`
      );
      setData(res.data);
      setstate(true);
    };
    GetPosts();
  }, []);
  return (
    <View>
      <ScrollView style={styles.CardsStyle}>
        {state
          ? Data
            ? Data.map((e) => <Card key={e._id} props={e} />)
            : null
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  CardsStyle: {
    marginBottom: 100,
  },
});
export default Cards;
